import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes'


class RequestNew extends Component {

  static async getInitialProps(props) {
    const {address} = props.query;

    return {address}
  }

  state={
    description: '',
    value: '',
    recipient: '',
    error: '',
    loading: false
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const {description, value, recipient} = this.state;

    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    this.setState({loading: true, error: ''})

    try {
      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
        from: accounts[0]
      })

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)

    } catch (error) {
      this.setState({error: error.message})
    }

  
    this.setState({loading: false})


  }

  render() {
    console.log('Error: ', this.state.error)
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back </a>
        </Link>
          <h3>Create A Request</h3>
          <Form onSubmit={this.onSubmit}  error={!!this.state.error} >
              <Form.Field>
                <label>Description</label>
                <Input 
                  value={this.state.description}
                  onChange={e => this.setState({description: e.target.value})}
                />
              </Form.Field>

              <Form.Field>
                <label>Value in Ether</label>
                <Input 
                  value={this.state.value}
                  onChange={e => this.setState({value: e.target.value})}
                />
              </Form.Field>

              <Form.Field>
                <label>Recipient (address)</label>
                <Input 
                  value={this.state.recipient}
                  onChange={e => this.setState({recipient: e.target.value})}
                />
              </Form.Field>

              <Message error header="Oops!" content={this.state.error} />

              <Button primary loading={this.state.loading} type='submit'>Create!</Button>
          </Form>
      </Layout>
    );
  }
}

export default RequestNew;