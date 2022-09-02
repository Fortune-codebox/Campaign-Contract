import React, { Component } from 'react';
import {Table, Button, Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import {Router} from '../routes'

class RequestRow extends Component {
  state={
    loading: false,
    loadingFinalize: false,
    error: ''
  }

  onApprove = async () => {
    this.setState({loading: true})
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts()

      try {

        await campaign.methods.approveRequest(this.props.id).send({
          from : accounts[0]
      })

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`)

        
      } catch (error) {
        this.setState({error: error.message})
        
      }
      this.setState({loading: false})
  }

  onFinalize = async () => {
    this.setState({loadingFinalize: true})
    const campaign = Campaign(this.props.address);

    const accounts = await  web3.eth.getAccounts();

    try {

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      })

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
      
    } catch (error) {

      
    }

    this.setState({loadingFinalize: false})

  }

  render(){
   const {id, request, approversCount} = this.props;
   const {Row, Cell} = Table;
   const readyToFinalize = request.approvalCount > approversCount / 2
    return(
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
          {/* <Message error header="Oops!" content={this.state.error} /> */}
          <Cell>{id  + 1}</Cell>
          <Cell>{request.description}</Cell> 
          <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
          <Cell>{request.recipient}</Cell>
          <Cell style={{alignText: 'center'}}>{request.approvalCount}/{approversCount}</Cell>
         
          <Cell>
            { request.complete ? null :
            (<Button loading={this.state.loading} color="green" basic onClick={this.onApprove}>
              Approve
            </Button>)
              }
          </Cell>
          <Cell>
            { request.complete ? null :
            (<Button loading={this.state.loadingFinalize} color="teal" basic onClick={this.onFinalize}> 
              Finalize
            </Button>)
            }
          </Cell>

      </Row>
    );
  }
}

export default RequestRow;