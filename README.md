# Proof Of Existence on Ethereum
[![Build Status](https://travis-ci.com/cnusrini/ethereum_proofofExistence.svg?branch=master)](https://travis-ci.com/cnusrini/ethereum_proofofExistence)

* What does ProofOfExistence project do?
  * Allow user to log in using uPort
  * Allow user to browse and upload the snap to IPFS
  * Displays all the snaps uploaded to IPFS with the below details:
    * ipfsHash
    * date and time of upload in EST
    * Person who uploaded
* Smart contract is built on the below Ethereum versions :
  * Truffle v4.0.4
  * Solidity v0.4.18 (solc-js)
  * Node v8.11.2

* Unit testing using :
  * javaScript,
  * Ganache CLI v6.2.5 (ganache-core: 2.3.3)

* Build in :
  * travis ci

* Steps to install the proofOfExistence Dapp
  * clone or download the repo.
  * cd to the above repo.
  * execute npm install

* Steps to execute the dapp
  * cd to the above repo.
  * execute npm run dev

# Migrate/deploy contract
For Ganache - in the repo directory execute the below command :
  * truffle migrate --reset --network ganache
  * truffle console --network ganache
For rinkeby - in the repo directory execute the below command to deploy to rinkeby netowrk:
    * truffle migrate --reset --network rinkeby
    * truffle console --network rinkeby

# To test the smart contract using truffle test
  * In the project directory, execute truffle test

# To execute UI and test
* Run npm run dev
* browse localhost:3000 in chrome
* select the button 'Login with uport identity' will prompt to scan uPort QR code
* Wait for around 5 secods . uPort will capture your name and the name of the app
* Browse the snap you want to upload to Blockchain and then select the button 'submitToIpfs'
* Wait for around 15 secods. Page will automatically reload with the uploaded snap ipfshash , its time and the owner who uploaded.
