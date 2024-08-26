const {PinataSDK} = require("pinata")

const pinataJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDUwZmFhNy0zZTViLTRlMTgtYjQ2OC0zMTBhMmI0MjI5YTEiLCJlbWFpbCI6InNlYkBjaGltaS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2NDhlZmJmNjczYjhhM2ZjMzk0MiIsInNjb3BlZEtleVNlY3JldCI6ImIyNWEzOGFjZTRhNzYwMzc3Y2IzYzNlMThhMTZlYTFmYTk1ZDBlNjMyZGZjYTFmNDBkMzQ4MTZiZTY5YmJlZWQiLCJleHAiOjE3NTQ1Nzg2NzR9.ZAzOp4EbBzT1wRMiSvEM8fT3xsI24AxxslZppJWMwv0'

const pinata = new PinataSDK({
  pinataJwt,
  pinataGateway: "impact-scribe.mypinata.cloud",
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
