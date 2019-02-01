# Proof Of Existence project on Ethereum
* This document captures my decision criteria in the following :
  * In designing smart contract
  * In designing front end
  * In designing IPFS and uPort
  * In designing test suites

* What does ProofOfExistence project do?
  * Allow user to log in using uPort
  * Allow user to browse and upload the snap to IPFS
  * Displays all the snaps uploaded to IPFS with the below details:
    * ipfsHash
    * date and time of upload in EST
    * Person who uploaded

* Decision criteria in designing smart contract:
  * To use events where ever possible for the below reasons :
    * cheaper form of storage in smart contract return
    * Asynchronous data triggering to the front end

* Decision on Front end :
  * Used ReactJS, semantic-ui-react and Nextjs as a technology stack to gaiin the below benifits :
    * Asynchronous calls to smart contract very seamless
    * efficient form of loading smart contract events using getInitialProps() methods
    * semantic-ui-react for nice and easy UI setup
    * momentjs for easy human readable time formatter

* Decision on designing IPFS
  * Used IPFS as a cheaper form of storing large file such as pictures, videos.
* Decision on designing uPort
  * A decentralized identity system which gives me ultimate confidence in in my data of not loosing.
* Decision on designing test suites
  * Used nodejs , chai and expect based test suites for more stronger assertions.
