import web3 from './web3';
import poeContract from './build/contracts/ProofOfExistence.json';

const address = '0x5b65810427330a935d4e30b90189d880ce9db652'

const abi = '[{"constant":false,"inputs":[{"name":"_snapHash","type":"string"}],"name":"setSnapDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_snap","type":"string"}],"name":"setgetsnapDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentUserEvent","type":"address"},{"indexed":false,"name":"snapEvent","type":"string"},{"indexed":false,"name":"timeEvent","type":"uint256"}],"name":"logNewSnapDetails","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentUserEvent1","type":"address"},{"indexed":false,"name":"snapEvent1","type":"string"},{"indexed":false,"name":"timeEvent1","type":"uint256"}],"name":"logsetgetDetails","type":"event"}]';

const instance = new web3.eth.Contract(JSON.parse(abi), address);


export default instance;
