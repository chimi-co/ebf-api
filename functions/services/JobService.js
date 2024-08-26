const {logger} = require("firebase-functions")
const {getPendingSignatures, getMonitor, updateMonitor, updateSignature, updateSurvey} = require("./FirestoreService")

const {getEASClient} = require("./EASService")

const monitorDelegatedAttestations = async () => {
  logger.info('Starting monitorDelegatedAttestations monitor')

  const monitor = await getMonitor('delegatedAttestation')

  if(!monitor?.inProgress) {
    await updateMonitor( monitor.id, {inProgress: true})

    const pendingSignatures = await getPendingSignatures()
    logger.info(`${pendingSignatures?.length} PENDING SIGNATURES: `, pendingSignatures)

    for await (let signature of pendingSignatures) {
      const params = {
        schema: signature.schema,
        data: {
          recipient: signature.recipient,
          expirationTime: signature.expirationTime,
          revocable: signature.revocable,
          refUID:  signature.revocable.refUID,
          data: signature.data,
        },
        signature: signature.signature,
        attester: signature.attester,
      }

      const networkName = signature?.network?.name
      const eas = getEASClient(networkName)

      try {
        const tx = await eas.attestByDelegation(params)
        const response = await tx.wait()

        await updateSignature(signature.id, {attestUID: response, status: 'COMPLETED'})
        await updateSurvey(signature.surveyId, {status: 'COMPLETED', attestation: {attestUID: response, network: networkName}})

        logger.info('Signature attested', signature.id)
      } catch (error){
        logger.error(`Signature with id: ${signature.id} failed in attestation`, error)
      }
    }

    await updateMonitor( monitor.id, {inProgress: false})
    logger.info(`Complete monitorDelegatedAttestations monitor with: ${pendingSignatures?.length} pending signatures`)
  }
}

module.exports = {
  monitorDelegatedAttestations,
}
