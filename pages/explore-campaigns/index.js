import React, { Component } from "react";
import Layout from "../../components/components/Layout";
import MenuMessageScene from "../../components/scenes/message";
import GetConnectScene from "../../components/scenes/get-connect";
import { getWalletStatus } from "../../web3/web3";

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
            <MenuMessageScene />
            <GetConnectScene walletStatus={walletStatus}/>
        </Layout>
        );
    }
}

export default ExploreCampaignsPage;