import React, { Component } from 'react';
import Layout from '../../components/Layout'
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes'

class CampaignNew extends Component{
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true, errorMessage: ''})
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      })

      Router.pushRoute('/');
      
    } catch (error) {
      this.setState({errorMessage: error.message})
    }

    this.setState({loading: false})

  }

  render() {
    return (
      <Layout>
         <h3>Create A Campaign!</h3>
         <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              label="wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={e => this.setState({minimumContribution: e.target.value})}
              />

          </Form.Field>

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button primary loading={this.state.loading} type='submit'>Create!</Button>
        </Form>
      </Layout>
    )

  }
  
}

export default CampaignNew
