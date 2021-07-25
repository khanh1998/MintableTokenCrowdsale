require('dotenv').config({ path: '../.env' })
const TokenSale = artifacts.require('./KTokenSale.sol')
const Token = artifacts.require('./KToken.sol')
const Kyc = artifacts.require('./Kyc.sol')

const chai = require('./setupChai.js')
const BN = web3.utils.BN; // big number

const expect = chai.expect

contract('test hereh', async (accounts) => {
    const [deployer, recipient, other] = accounts
    const { INITITIAL_TOKEN } = process.env
    beforeEach(async () => {
        this.myToken = await Token.new(INITITIAL_TOKEN)
    })

    it("there shouldnt be any coins in my account", async () => {
        let instance = await Token.deployed();
        expect(instance.balanceOf.call(deployer)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    // it('all token should be in the tokensale by default', async () => {
    //     const instance = await Token.deployed()
    //     const balanceOfTokenSale = await instance.balanceOf.call(TokenSale.address)
    //     const totalSupply = await instance.totalSupply()
    //     expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply)

    // })

    // it('should be possible to buy tokens', async () => {
    //     const tokenInstance = await Token.deployed()
    //     const tokenSaleInstance = await TokenSale.deployed()
    //     const balanceBefore = tokenInstance.balanceOf.call(deployer)
    //     const transaction = tokenSaleInstance.sendTransaction.call({
    //         from: deployer,
    //         value: web3.utils.toWei('1', 'wei'),
    //     })
    //     expect(transaction).to.be.fulfilled;
    //     expect(tokenInstance.balanceOf.call(deployer)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)))
    // })

    it("all coins should be in the tokensale smart contract", async () => {
        let instance = await Token.deployed();
        let balance = await instance.balanceOf.call(TokenSale.address);
        let totalSupply = await instance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        const kycInstance = await Kyc.deployed()
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient)
        kycInstance.setKycCompleted(deployer, { from: deployer })
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
    });
})