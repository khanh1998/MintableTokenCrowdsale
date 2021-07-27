# How to deploy smart contracts to Ganache
1. start Ganache
2. start `truffle console` in the project root folder, by default, it will connect to the `development` network
3. using bellow statement in Truffle console to send money from default Ganache account to an account in Metamask
`web3.eth.sendTransaction({ from: accounts[0], to: "metamask account address", value: web3.utils.toWei("10", "ether") })`
4. exit current Truffle console: `.exit`
5. deploy contracts to `ganache` network using first Metamask account
`truffle deploy --network ganache --reset`

# How to config network
At the moment, there are two networks, the default network is `development` and another network is `ganache`.
`ganache` network using HDWalletProvider to sign transactions with an account in Metamask
### Explanation for step 3, why I have to send ether from Ganache account to Metamask account
By default, Truffle will sign transactions with default accounts Ganache, but it's not convenient.
I want to use an account in Metamask to do so. But my Metamask account has 0 ether in the `ganache` network.
So, first of all, I have to connect to the `development` network and send some ether to my Metamask account.
Then, I can use the Metamask account to deploy smart contracts, to send transactions.

### Metamask, Ganache, and HDWalletProvider
If you type `ganache console` in the project root folder, and then type `accounts`. A list of 10 account addresses will show up and it is the same with 10 accounts you see in Ganache UI.
However, type `ganache console --network ganache`, then type `accounts`. You will see the account addresses are printed out are your Metamask account address.