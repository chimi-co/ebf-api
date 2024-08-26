const {ethers} = require("ethers")
const {EAS} = require("@ethereum-attestation-service/eas-sdk")
const functions = require("firebase-functions")

const infuraApiKey = functions.config().env.infura_api_key

const mnemonic = functions.config().env.mnemonic

const NETWORK_CONFIG = {
  Sepolia: {
    easContractAddress: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
    providerUrl: `https://sepolia.infura.io/v3/${infuraApiKey}`
  },
  Arbitrum: {
    easContractAddress: '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458',
    providerUrl: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`
  },
  Celo: {
    easContractAddress: '0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92',
    providerUrl: `https://celo-mainnet.infura.io/v3/${infuraApiKey}`
  },
}

const getEASClient = (network) => {
  const {easContractAddress, providerUrl} = NETWORK_CONFIG[network]
  const provider =  new ethers.JsonRpcProvider(providerUrl)
  const wallet = ethers.Wallet.fromPhrase(mnemonic, provider)

  const eas = new EAS(easContractAddress)
  eas.connect(wallet)

  return eas
}

module.exports = {
  getEASClient
}
