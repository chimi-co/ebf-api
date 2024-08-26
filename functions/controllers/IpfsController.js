const { logger } = require('firebase-functions')

const {getSurvey} = require("../services/FirestoreService")
const {upload} = require("../services/PinataService")


const doRetrieveIpfsUri = async (request, response) => {
  logger.info('Executing retrieve ipfs uri.')
  try {
    const surveyId = request.params['id']

    const survey = await getSurvey(surveyId)
    const data = survey.steps.map((step) => {
      return step.questions
    })

    const questions = [].concat(...data)

    const uploadResponse = await upload({questions})

    response.send(uploadResponse)
  } catch (error) {
    logger.error(`An error occurred while retrieving ipfs uri.`, error)

    const status = error.status || 500
    const errorMessage = error.message || 'Unknown error.'

    response.status(status).send({ errorMessage })
  }
}

module.exports = {
  doRetrieveIpfsUri
}
