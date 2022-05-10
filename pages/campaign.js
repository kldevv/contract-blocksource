import React, { Component } from "react";
import { Container, Segment, Card, Icon } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/components/Layout";
import CampaignCard from "../components/components/CampaignCard";
import ViewColorBarScene from "../components/scenes/view-color-bar";
import ViewMetaScene from "../components/scenes/view-meta";
import { getWalletStatus } from "../web3/web3";

class CampaignViewPage extends Component {
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
        const campaignInfo = {
            name: "test",
            description: "test",
            address: "0x0",
            patronCount: 3,
            openRequestCount: 10,
            owner: "0x0"
        }
        return (
            <Layout walletStatus={walletStatus}>
                <Segment 
                vertical
                style={{
                    minHeight: 2000
                }}>
                    <ViewColorBarScene />
                    <ViewMetaScene campaignInfo={campaignInfo}/>
                </Segment>
            </Layout>
        );
    }
}

export default CampaignViewPage;