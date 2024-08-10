const {pubsub} = require("firebase-functions");

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {monitorDelegatedAttestations} = require("./services/JobService");

const helloWorld = onRequest(async (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  // await monitorDelegatedAttestations()
  response.send("Hello from Firebase!");
});

module.exports = {
  helloWorld,

  // Jobs
  attestationsDelegatedMonitor: pubsub
      .schedule("every 1 minutes synchronized")
      .onRun(monitorDelegatedAttestations),
};


