import React, { Component } from "react";
import Layout from "../components/common/Layout";
import ExploreHeaderBarScene from "../components/explore-campaign/ExploreHeaderBarScene";
import ExploreCampaignListScene from "../components/explore-campaign/ExploreCampaignListScene";
// import GetConnectScene from "../components/scenes/get-connect";
import { getWalletStatus, getFirstAccount } from "../web3/lib/wallet";
import { getAllCampaignInfo } from "../web3/lib/info"

class ExploreCampaignsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            allCampaignInfo: [],
            account: "0x0"
        }
    }

    async componentDidMount() {
        const walletStatus = await getWalletStatus();
        const account = await getFirstAccount();
        const allCampaignInfo = await getAllCampaignInfo();
        this.setState({
            walletStatus,
            allCampaignInfo,
            account
        })
    }

    render() {
        const { walletStatus, allCampaignInfo, account } = this.state;
        return (
        <Layout activeItem="Explore" walletStatus={walletStatus} account={account}>
            <ExploreHeaderBarScene content={"Explore Campaigns"} backgroundColor="white" />
            {/* <GetConnectScene walletStatus={walletStatus}/> */}
            <ExploreCampaignListScene allCampaignInfo={ allCampaignInfo }/>
        </Layout>
        );
    }
}

export default ExploreCampaignsPage;