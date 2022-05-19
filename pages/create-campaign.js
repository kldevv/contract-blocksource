import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import Layout from "../components/common/Layout";
import CreateCampaignScene from "../components/create-campaign/CreateCampaignScene";
import { getWalletStatus, getFirstAccount } from "../web3/lib/wallet";

class CreateCampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            account: "0x0"
        }
    }

    async componentDidMount() {
        const walletStatus = await getWalletStatus();
        const account = await getFirstAccount();
        this.setState({
            walletStatus,
            account
        })
    }
    
    render() {
        const { walletStatus, account } = this.state;
        return (
            <Layout activeItem="Create" walletStatus={walletStatus} account={account}>
                <Segment 
                vertical
                style={{
                    minHeight: 1800
                }}>
                    <CreateCampaignScene walletStatus={walletStatus}/>
                </Segment>
            </Layout>
        );
    }
}

export default CreateCampaignPage;