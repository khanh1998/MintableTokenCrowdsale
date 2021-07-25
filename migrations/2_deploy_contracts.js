const KToken = artifacts.require('./KToken.sol')
const KTokenSale = artifacts.require('./KTokenSale.sol')
const Kyc = artifacts.require('./Kyc.sol')
require('dotenv').config({ path: '../.env'})

module.exports = async (deployer) => {
    const walletAddress = await web3.eth.getAccounts()
    const { INITITIAL_TOKEN } = process.env
    console.log({ INITITIAL_TOKEN })
    await deployer.deploy(KToken, `${INITITIAL_TOKEN}`)
    const kTokenIns = await KToken.deployed()
    await deployer.deploy(Kyc)
    // const kycIns = await Kyc.deployed()
    await deployer.deploy(KTokenSale, 1, walletAddress[0], KToken.address, Kyc.address)
    // const kTokenSaleIns = await KTokenSale.deployed()
    await kTokenIns.transfer(KTokenSale.address, `${INITITIAL_TOKEN}`)
}