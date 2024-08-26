const { collection, query, where, doc, getDoc,getDocs, updateDoc} = require('firebase/firestore')
const {db} = require("../firebase");
const {logger} = require("firebase-functions");

const DELEGATE_ATTESTATION_SIGNS_COLLECTION = 'DelegateAttestationSigns'

const getSignatureById = async (id) => {
  try {
    const attestationDelegatedRef = doc(db, DELEGATE_ATTESTATION_SIGNS_COLLECTION, id)
    const docSnap =  await getDoc(attestationDelegatedRef)
    return docSnap.data()
  } catch (error) {
    logger.error('Error obteniendo el documento: ', error)
  }
}

async function getDocuments(collectionName, conditions = []) {
  try {
    const colRef = collection(db, collectionName);
    const queryConstraints = conditions.map((condition) => where(...condition));
    const q = query(colRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents
  } catch (error) {
    logger.error('Error getting documents: ', error);
  }
}

async function updateDocument(collectionName, documentId, updatedData) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

const getPendingSignatures = async () => {
  try {
    const conditions = [
      ['status', '==', 'PENDING']
    ]
    return await getDocuments('DelegateAttestationSigns', conditions)
  } catch (error) {
    logger.error('Error getting pending signatures', error)
  }
}

const getMonitor = async (monitorType) => {
  const conditions = [
    ['type', '==', monitorType]
  ]
  const documents = await getDocuments('monitors', conditions)
  return documents[0]
}

const updateMonitor = async (id, values) => {
  await updateDocument('monitors', id, values)
}

const updateSignature = async (id, values) => {
  await updateDocument('DelegateAttestationSigns', id, values)
}

const getSurvey = async (id) => {
  const surveyRef = doc(db, 'surveys', id)
  const docSnap =  await getDoc(surveyRef)
  return docSnap.data()
}

const updateSurvey = async (id, values) => {
  await updateDocument('surveys', id, values)
}

module.exports = {
  getMonitor,
  getSurvey,
  getPendingSignatures,
  getSignatureById,
  updateMonitor,
  updateSignature,
  updateSurvey
}
