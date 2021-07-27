import React, { Component } from "react";
import KToken from "./contracts/KToken.json"
import KTokenSale from "./contracts/KTokenSale.json"
import Kyc from "./contracts/Kyc.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contracts: { kTokenIns: null, kTokenSaleIns: null, kycIns: null },
    input: { kycAddress: '', },
    tokenSaleAddr: '',
    userTokens: 0,
    totalSupply: 0,
    minting: { value: 0, address: '' },
    isMinter: false,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const kTokenIns = this.getContractInstance(KToken, networkId, web3)
      const kTokenSaleIns = this.getContractInstance(KTokenSale, networkId, web3)
      const kycIns = this.getContractInstance(Kyc, networkId, web3)
      
      const tokenSaleAddr = KTokenSale.networks[networkId].address
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, contracts: { kTokenIns, kTokenSaleIns, kycIns }, tokenSaleAddr },
        this.getUserToken
      );
      this.callbacks()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  callbacks = () => {
    this.getCurrentTotalSupply()
    this.listenToTransferEvent()
    this.isMinter()
  }

  getCurrentTotalSupply = async () => {
    const { kTokenIns } = this.state.contracts
    const totalSupply = await kTokenIns.methods.totalSupply().call()
    this.setState({ totalSupply })
  }

  getUserToken = async () => {
    const { kTokenIns } = this.state.contracts
    const { accounts } = this.state
    const userTokens = await kTokenIns.methods.balanceOf(accounts[0]).call()
    this.setState({ userTokens })
  }

  isMinter = async () => {
    const { kTokenIns } = this.state.contracts
    const { accounts } = this.state
    const isMinter = await kTokenIns.methods.isMinter(accounts[0]).call()
    console.log({ isMinter });
    this.setState({ isMinter })
  }

  handleBuyToken = async (event) => {
    const { kTokenSaleIns } = this.state.contracts
    const { accounts, web3 } = this.state
    await kTokenSaleIns.methods
      .buyTokens(accounts[0])
      .send({ from: accounts[0], value: web3.utils.toWei('1', 'wei')  })
  }

  listenToTransferEvent = () => {
    const { kTokenIns } = this.state.contracts
    const { accounts } = this.state
    kTokenIns.events.Transfer({to: accounts[0]}).on('data', this.getUserToken)
  }

  getContractInstance = (contractJson, networkId, web3) => {
    const deployedNetwork = contractJson.networks[networkId];
    const instance = new web3.eth.Contract(
      contractJson.abi,
      deployedNetwork && deployedNetwork.address,
    );
    return instance
  }

  handleInputChange = (stateName) => (event) => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    const state = this.state[stateName]
    state[name] = value
    this.setState({
      ...state,
    })
  }

  handleSubmit = async () => {
    const { kycAddress } = this.state.input
    const { kycIns } = this.state.contracts
    const from = this.state.accounts[0]
    console.log({ kycAddress, from })
    const res = await kycIns.methods.setKycCompleted(kycAddress).send({ from })
    console.log(res)
  }

  handleMintingToken = async () => {
    const { address, value } = this.state.minting
    const { web3 } = this.state
    const { kTokenIns } = this.state.contracts
    const from = this.state.accounts[0]
    console.log({ address, value });
    await kTokenIns.methods.mint(address, web3.utils.toWei(value, 'wei')).send({ from })
    console.log("here");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>K Token sale</h1>
        <p>get your token now</p>
        <p>{
          this.state.isMinter ? "You are a minter" : "you are not a minter"
        }</p>
        <h2>kyc whitelisting</h2>
        address to allow:
        <input
          name="kycAddress"
          value={this.state.input.kycAddress}
          placeholder="KyC Address"
          onChange={this.handleInputChange('input')} />
        <button onClick={this.handleSubmit}>Send</button>

        <h2>Current available token</h2>
        <p>{ this.state.totalSupply }</p>

        <h2>Mint more token</h2>
        <input
          name="address"
          type="text"
          value={this.state.minting.address}
          onChange={this.handleInputChange('minting')}
        />
        <input
          name="value"
          type="number"
          value={this.state.minting.value}
          onChange={this.handleInputChange('minting')}
        />
        <button onClick={this.handleMintingToken}>Send</button>

        <h2>Buy tokens</h2>
        <p>{this.state.tokenSaleAddr}</p>

        <h2>Current token</h2>
        <p>You currently have {this.state.userTokens}</p>
        <button type="button" onClick={this.handleBuyToken}>Buy more</button>
      </div>
    );
  }
}

export default App;
