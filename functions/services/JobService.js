const {logger} = require("firebase-functions");
const {getPendingSignatures, getMonitor, updateMonitor, updateSignature, updateSurvey} = require("./FirestoreService");
const {ethers} = require("ethers");
const {EAS} = require("@ethereum-attestation-service/eas-sdk");
const functions = require("firebase-functions");

const monitorDelegatedAttestations = async () => {
  logger.info('Starting monitorDelegatedAttestations monitor')

  const mnemonic = functions.config().config.mnemonic

  logger.info('mnemonic', mnemonic)
  const providerUrl = 'https://sepolia.infura.io/v3/4995daead95c4cb789600bfe1eb67254'

  const provider =  new ethers.JsonRpcProvider(providerUrl)
  const wallet = ethers.Wallet.fromPhrase(mnemonic, provider)

  const SEPOLIA_EAS_CONTRACT_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'

  const eas = new EAS(SEPOLIA_EAS_CONTRACT_ADDRESS)
  eas.connect(wallet)

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

      try {
        const tx = await eas.attestByDelegation(params)
        const response = await tx.wait()

        await updateSignature(signature.id, {attestUID: response, status: 'COMPLETED'})
        await updateSurvey(signature.surveyId, {status: 'COMPLETED'})

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
