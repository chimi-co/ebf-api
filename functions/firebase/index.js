const { initializeApp } = require("firebase/app")
const { getFirestore } = require('firebase/firestore')
const functions = require('firebase-functions')

const firebaseConfig = {
  apiKey: functions.config().env.firebase_api_key,
  authDomain: functions.config().env.firebase_auth_domain,
  projectId: functions.config().env.firebase_project_id,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

module.exports = {
  db
}
