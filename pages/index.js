import React, { Component } from "react";
import IndexWelcomeScene from "../components/index/IndexWelcomeScene";
import IndexExploreScene from "../components/index/IndexExploreScene";
import IndexAboutScene from "../components/index/IndexAboutScene";
import Layout from "../components/common/Layout";
import { getFirstAccount, getWalletStatus } from "../web3/lib/wallet";

class LandingPage extends Component {
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
            <Layout walletStatus={walletStatus} account={account}>
                <IndexWelcomeScene walletStatus={walletStatus} account={account}/>
                <IndexExploreScene />
                <IndexAboutScene />
            </Layout>
        )
    }
}

export default LandingPage;