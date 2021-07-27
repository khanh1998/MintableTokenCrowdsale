const KToken = artifacts.require('./KToken.sol')
const KTokenSale = artifacts.require('./KTokenSale.sol')
const Kyc = artifacts.require('./Kyc.sol')
require('dotenv').config({ path: '../.env'})

module.exports = async (deployer) => {
    const walletAddress = await web3.eth.getAccounts()
    const { INITITIAL_TOKEN } = process.env
    console.log({ INITITIAL_TOKEN })
    // deploy KToken
    await deployer.deploy(KToken)
    const kTokenIns = await KToken.deployed()
    // deploy KyC
    await deployer.deploy(Kyc)
    // depoy KToken Crowd Sale
    await deployer.deploy(KTokenSale, 1, walletAddress[0], KToken.address, Kyc.address)
    // make KToken Crowd Sale becoming a Minter
    await kTokenIns.addMinter(KTokenSale.address)
}