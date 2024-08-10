const { initializeApp } = require("firebase/app")
const { getFirestore } = require("firebase/firestore")
const functions = require('firebase-functions')

const firebaseConfig = {
  apiKey: functions.config().config.firebase_api_key,
  authDomain: functions.config().config.firebase_auth_domain,
  projectId: functions.config().config.firbase_project_id,
  storageBucket: functions.config().config.firebase_storag_bucket,
  messagingSenderId: functions.config().config.firebase_messaging_sender_id,
  appId: functions.config().config.firebase_app_id,
  measurementId:functions.config().config.firebase_meassurement_id
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = {
  db
}
