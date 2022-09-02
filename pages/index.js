import React, { Component, Fragment } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout';
import {Link} from '../routes';
import Header from '../components/Header';
import Campaigns from '../components/Campaigns'



class CampaignIndex extends Component {

   state = {
       commonStyles :  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"

   }

   static async getInitialProps() {
      const campaigns = await factory.methods.getDeployedCampaigns().call();

      return {campaigns}
   }

   renderCampaigns() {
      
      const items = this.props.campaigns.map(address => {
         return {
            header: address,
            description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
            fluid: true
         }
      })
      // console.log('items: ', items)
      return <Card.Group items={items} />
   }

   render() {
   return (
       <Fragment>
         <div className="gradient-bg-welcome">
            <Header />
            <Layout>
            <div className="flex w-full justify-center items-center">
               <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ">
               <div className="flex flex-1 justify-start flex-col mf:mr-10">
                <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1"> 
                  Create Fund Raising, <br/> 
                  

                </h1>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                  Create A Campaign, Get Approved From Your Contributors On Your Request.
                </p>
                

               <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                  <div className={`rounded-tl-2xl ${this.state.commonStyles}`}>
                    Reliability
                  </div>
                  <div className={this.state.commonStyles}>Security</div>
                  <div className={`rounded-tr-2xl ${this.state.commonStyles}`}>
                    Ethereum
                  </div>
                  <div className={`rounded-bl-2xl ${this.state.commonStyles}`}>
                    Web 3.0
                  </div>
                  <div className={this.state.commonStyles}>Low Fees</div>
                  <div className={`rounded-br-2xl ${this.state.commonStyles}`}>
                   Blockchain
                  </div>
                </div>
              </div>
                        
                     {/* <Link route="/campaigns/new">
                        <a>
                           <Button 
                              content='Create Campaign' 
                              icon='add circle' 
                              primary
                           />
                        </a>
                     </Link> */}

               </div>
               
             </div>

             <Campaigns />

           </Layout>
         </div>
           
       </Fragment>
         
      
   );
   }
}

export default CampaignIndex