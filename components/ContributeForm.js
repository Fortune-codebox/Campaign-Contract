import React, {Component} from 'react'
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';


class ContributeForm extends Component{
 state = {
   value: '',
   loading: false,
   error: ''
 }

 onSubmit = async (e) => {
  e.preventDefault();

  const campaign = Campaign(this.props.address);
  this.setState({loading: true, error: ''})
    try {
      
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
         from: accounts[0],
         value: web3.utils.toWei(this.state.value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)

    } catch (error) {
      this.setState({error: error.message})
      
    }

    this.setState({loading: false, value: ''})

 }

 render() {

  return (
    <Form onSubmit={this.onSubmit} error={!!this.state.error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input 
          label="ether"
          labelPosition="right"
          value={this.state.value}
          onChange={e => this.setState({value: e.target.value})}
        />
      </Form.Field>

      <Message error header="Oops!" content={this.state.error} />

      <Button loading={this.state.loading} primary>
        Contribute
      </Button>
    </Form>
  )
 }
}

export default ContributeForm
