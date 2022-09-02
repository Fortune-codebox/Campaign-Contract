const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'session agent drive sheriff math crawl venue load cube squirrel very brick',
  'https://rinkeby.infura.io/v3/c5d8d1aab2c149dc97b6fa62029a4a6b',
);
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1400000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  // await new web3.eth.Contract(
  //   JSON.parse(compiledCampaign.interface),
  //   result.options.address
  // )

  provider.engine.stop();
};

deploy();