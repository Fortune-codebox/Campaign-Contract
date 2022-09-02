const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: '1400000'});

    await factory.methods.createCampaign('100').send({
      from: accounts[0], gas: '1000000'
    });

    // const addresses = await factory.methods.getDeployedCampaigns().call();
    // campaignAddress = addresses[0];

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
    //Pass in the address from the already deployed Campaign Factory
    campaign = await new web3.eth.Contract(
      compiledCampaign.abi,
      campaignAddress
      )

})

describe('Campaigns', () => {

   it('Deploys a factory and a campaign', async () => {
     assert.ok(factory.options.address);
     assert.ok(campaign.options.address)
   });

   it('Marks the caller as the Campaign Manager', async () => {
      const manager = await campaign.methods.manager().call();
      assert.strictEqual(manager, accounts[0])
   });

   it('Allows people to contribute money and marks them as approvers', async() => {
     await campaign.methods.contribute().send({
       from: accounts[1],
       value: '200'
     });

     const isContributor = await campaign.methods.approvers(accounts[1]).call();

    //  assert.strictEqual(true, isContributor)
    assert(isContributor)
   });

   it('Requires a minimum contribution', async () => {
      try {
         await campaign.methods.contribute().send({
           value: '5',
           from: accounts[1]
         });

         assert(false)
        
      } catch (error) {
        assert(error)
      }
   });

   it('Allows a manager to make a payment request', async () => {
      await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[1])
      .send({
          from: accounts[0],
          gas: '1000000'
      });

      let req = {

      }
      const request = await campaign.methods.requests(0).call();

      assert.strictEqual('Buy Batteries', request.description)

   });

   it('It processes request', async () => {
     await campaign.methods.contribute().send({
       from: accounts[0],
       value: web3.utils.toWei('10', 'ether')
     });

     await campaign.methods 
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

     await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
     });

     await campaign.methods
      .finalizeRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      });

    let balance =   await web3.eth.getBalance(accounts[[1]]);
    balance = web3.utils.toWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log('balance: ', balance)
    assert(balance > 104)

   })

})
