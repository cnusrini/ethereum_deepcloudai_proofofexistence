const assert = require('chai').assert;
var should = require('should');
const expect = require('expect.js')
const truffleAssert = require('truffle-assertions');
const proofOfExistence = artifacts.require('ProofOfExistence');

/* testSuites design approach:
To use beforeEach and afterEach hook so that before the begening of the test execution, it will deploy the contract.
After the execution, it will clean every thing my killing the contract.
Design goal is to use blockchain which uses optimal gas consumption for the same operation.
Hence, I will test both the functions by passing the same value .
Next I will capclualte the gas used from both the methods. THen I will compare the gas used and cumulativeGasUsed
*/

contract('to perform test on the proofOfExistence smart contract', (accounts) => {
const owner = accounts[0]
const Alice = accounts[1]
const emptyAddress = '0x0000000000000000000000000000000000000000'
let deployedContract;
let eventEmitted = false;
//Even though, it stores the ipfshash , but its still a string.
var expectedsnapHash = 'ipfshash';
let setgetsnapDetailstx;
let tx

beforeEach( async () => {
deployedContract = await proofOfExistence.deployed();

});

//Passed expectedsnapHash to setSnapDetails and assert.eqaul.
it('tests setSnapDetails function', async () =>{
  tx = await deployedContract.setSnapDetails(expectedsnapHash);
  setgetsnapDetailstx = await deployedContract.setgetsnapDetails(expectedsnapHash);
  let actualsnapHash = tx.logs[0].args.snapEvent;

  assert.equal(expectedsnapHash, actualsnapHash, 'expectedsnapHash and actualsnapHash are not equal')

});
//Same expectedsnapHash is passed to setgetsnapDetails and assert.eqaul.
//This test and the above should pass.
it('tests setgetsnapDetails' , async() => {
  actualsnapHash = setgetsnapDetailstx.logs[0].args.snapEvent1

  assert.equal(expectedsnapHash, actualsnapHash, 'expectedsnapHash and actualsnapHash are not equal')

})
//For the same input provided, this test calculates the gasUsed in both the above tests and compares.
//Express.js is another assertions which I have used to support as a second openion to compare
it('compares gasUsed in setSoftwareDetails and setgetsnapDetails functions', async()=>{
  gasused = setgetsnapDetailstx.receipt.gasUsed
  gasusedinTX = tx.receipt.gasUsed


  assert.notEqual(gasused, gasusedinTX, 'gasused is less then gasusedinTX')
  assert.operator(gasused,'<', gasusedinTX, 'gasused is less then gasusedinTXl')
  expect(gasusedinTX).to.be.greaterThan(gasused)
})

//For the same input provided, this test calculates the cumulativeGasUsed in both the above tests and compares.
//Express.js is another assertions which I have used to support as a second openion to compare
it('compares cumulativeGasUsed in setSoftwareDetails and setgetsnapDetails functions', async() =>{
  cumulativeGasUsed = setgetsnapDetailstx.receipt.cumulativeGasUsed
  cumulativeGasUsedinTX = tx.receipt.cumulativeGasUsed

  assert.notEqual(cumulativeGasUsed, cumulativeGasUsedinTX, 'cumulativeGasUsed is less then cumulativeGasUsedinTX')
  assert.operator(cumulativeGasUsed,'<', cumulativeGasUsedinTX, 'cumulativeGasUsed is less then cumulativeGasUsedinTX')
  expect(cumulativeGasUsedinTX).to.be.greaterThan(cumulativeGasUsed)
})
//This test is to kill the contract by owner only
it('tests for the only owner to kill this contract')

afterEach( async () => {
await deployedContract.kill({from: owner});

});
});
