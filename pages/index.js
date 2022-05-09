import React, { Component } from "react";
import LandingWelcomeScene from "../components/scenes/landing-welcome";
import LandingExploreScene from "../components/scenes/landing-explore";
import LandingAboutScene from "../components/scenes/landing-about";
import Layout from "../components/components/Layout";
import { getWalletStatus } from "../web3/web3";

class LandingPage extends Component {
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
        const { walletStatus } = this.state;
        return (
            <Layout walletStatus={walletStatus}>
                <LandingWelcomeScene walletStatus={walletStatus}/>
                <LandingExploreScene />
                <LandingAboutScene />
            </Layout>
        )
    }
}

export default LandingPage;