const {PinataSDK} = require("pinata")
const functions = require("firebase-functions")

const pinata = new PinataSDK({
  pinataJwt: functions.config().env.pinata_jwt,
  pinataGateway: functions.config().env.pinata_gateway,
})

async function upload (data) {
  try {
    return await pinata.upload.json(data)
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  upload
}
