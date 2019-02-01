const IPFS = require('ipfs-api');
const ipfs = new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'});

export default ipfs;

/*

in browsefile fn home:52572:17
in captureFile handler home:52582:19
buffer value Uint8Array [ 255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 5200 more… ] home:52580:21
in submit to ipfs fn home:52608:17
buffer va Uint8Array [ 255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 5200 more… ] home:52613:17
in catch ipfsreturn is undefined
*/
