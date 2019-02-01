# Proof Of Existence project on Ethereum
* Below are the 2 functions I have used to avoid any common mistakes :
  * kill() function allows the owner only to kill this contract and not any other
  * revert() as a fallback function which will be called typically such users triggers the contract with no data.
* As my contract don't store or transact ethers, its a safer contract
