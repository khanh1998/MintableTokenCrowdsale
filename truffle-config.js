const path = require("path");
const hdwallet = require("@truffle/hdwallet-provider")
require('dotenv').config({ path: '.env'})

const mnemonic = process.env.MNEMONIC
const accountIndex = 0;
const host = "HTTP://127.0.0.1:7545"
const ropstenHost = 'https://ropsten.infura.io/v3/e92eb7102f194fad9c0c8fbacdc6762a'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      network_id: 5777,
      host: "127.0.0.1",
    },
    ganache: {
      provider: () => {
        return new hdwallet(mnemonic, host, accountIndex)
      },
      network_id: 5777,
    },
    ropsten: {
      provider: () => {
        return new hdwallet(mnemonic, ropstenHost)
      },
      network_id: 3,
      networkCheckTimeout: 100000000,
      gas: 4000000,
      gasPrice: 65000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.4",
    }
  }
};
