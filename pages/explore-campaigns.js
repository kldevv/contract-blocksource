import React, { Component } from "react";
import Layout from "../components/components/Layout";
import ExploreMessageBarScene from "../components/scenes/explore-message-bar";
import ExploreCampaignListScene from "../components/scenes/explore-campaign-list";
import GetConnectScene from "../components/scenes/get-connect";
import { getWalletStatus } from "../web3/web3";

class ExploreCampaignsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "disabled"
        }
    }
    async componentDidMount() {
        const walletStatus = await getWalletStatus();
        this.setState({
            walletStatus
        })
    }
    render() {
        const {walletStatus} = this.state;
        return (
        <Layout activeItem="Explore" walletStatus={walletStatus}>
            <ExploreMessageBarScene content={"Explore Campaigns"} backgroundColor="white" />
            {/* <GetConnectScene walletStatus={walletStatus}/> */}
            <ExploreCampaignListScene />
        </Layout>
        );
    }
}

export default ExploreCampaignsPage;