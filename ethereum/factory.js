import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x4C06e706ad2dE3180B90AA4FE7b9fA144b36A84B'
);


export default instance;