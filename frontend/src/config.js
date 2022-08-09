import Web3 from 'web3';
import { abi as landABI } from "./abi/Land.json";

// Network URLs and Web3 instance
const local = "ws://localhost:7545";
const metamask = window.ethereum;
const web3 = new Web3(metamask);

const contractAddress = "0xaec0efe01359dbc52c42fab1cb5777029dc6c991";
const landContract = new web3.eth.Contract(landABI, contractAddress);

export {
    web3,
    landContract
}