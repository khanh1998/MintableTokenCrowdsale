require('dotenv').config({ path: '../.env'})
const Token = artifacts.require('KToken')

const chai = require('./setupChai.js')

const BN = web3.utils.BN; // big number
const expect = chai.expect

contract('token test', (accounts) => {
    const [deployer, recipient, other] = accounts
    const { INITITIAL_TOKEN } = process.env
    beforeEach(async () => {
        this.myToken = await Token.new(INITITIAL_TOKEN)
    })
    it('should be ...', async () => {
        // const instance = await Token.deployed()
        // const instance = await Token.deployed();
        // const totalSupply = await instance.totalSupply.call()
        // const balance = await instance.balanceOf.call(deployer)
        // await expect(balance).to.be.a.bignumber.equal(totalSupply)
        // const balance1 = instance.balanceOf.call(deployer)
        // return expect(balance1).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it('should send token between accounts', async () => {
        // const sendToken = new BN(1)
        // const instance = await this.myToken
        // const totalSupply = await instance.totalSupply.call()
        // const balanceDeployer = await instance.balanceOf.call(deployer)
        // expect(balanceDeployer).to.be.a.bignumber.equal(totalSupply)

        // const transfer = await instance.transfer.call(recipient, sendToken)
        // expect(transfer).to.be.fulfilled

        // const balance1 = await instance.balanceOf.call(deployer) 
        // expect(balance1).to.be.a.bignumber.equal(totalSupply.sub(sendToken))

        // const balanceRecipient = await instance.balanceOf.call(recipient)
        // expect(balanceRecipient).to.be.a.bignumber.equal(sendToken)
    })

    //it('send more token than the available in total', async () => {
        // const instance = await Token.deployed()
        // const balanceOfDeployer = await instance.balanceOf(deployer)
        // console.log(balanceOfDeployer);
        // const sendValue = new BN(balanceOfDeployer + 1)
        // console.log(sendValue);
        // await expect(instance.transfer(recipient, sendValue)).to.eventually.be.rejected
        // await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)

        // let instance = await Token.deployed();
        //const instance = this.myToken
        //let balanceOfAccount = await instance.balanceOf(initialHolder);
        //await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;

        //check if the balance is still the same
        // await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    //})
})