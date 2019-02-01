var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

module.exports = {
  networks: {
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,
          "https://rinkeby.infura.io/" + process.env.INFURA_APIKEY
        );
      },
      network_id: 3,
      gas: 4700000
    },
    rinkeby: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/" + process.env.INFURA_API_KEY),
      network_id: '4',
      from:'0xeCdeAcAFdc3C519aBA7EEf2aEd94F48B80c4EF15',
      gas:4700000

    }
  }
};
