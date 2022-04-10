require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/NYhJUz6pnIBku7M_mVTycxgwhw3vXgVs",
      // wss: "wss://eth-rinkeby.alchemyapi.io/v2/NYhJUz6pnIBku7M_mVTycxgwhw3vXgVs",
      // apikey: "NYhJUz6pnIBku7M_mVTycxgwhw3vXgVs",
      // blockchain: "https://api-rinkeby.etherscan.io/",//Rinkeby api endpoint with etherscan [ https://docs.etherscan.io/v/rinkeby-etherscan ] -Docs
      accounts:["7c3221ac6f474e666fceeb737a51d81b6260d8c4f167fc2b2691009c9ac3337d"]
    },
  },
}

