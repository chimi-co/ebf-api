const {https, pubsub} = require("firebase-functions");

const express = require('express')
const cors = require('cors')

const {monitorDelegatedAttestations} = require("./services/JobService")
const {doRetrieveIpfsUri} = require("./controllers/IpfsController")

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions))

// New api endpoints - routes
app.get('/ipfs/:id', doRetrieveIpfsUri)

module.exports = {
  // New api endpoints:
  api: https.onRequest(app),

  // Jobs
  attestationsDelegatedMonitor: pubsub
      .schedule("every 1 minutes synchronized")
      .onRun(monitorDelegatedAttestations),
};


