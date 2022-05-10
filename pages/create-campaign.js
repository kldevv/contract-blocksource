import React, { Component } from "react";
import { Container, Header, Segment} from "semantic-ui-react";
import Layout from "../components/components/Layout";
import CreateCampaignFormScene from "../components/scenes/create-campaign-form";
import { getWalletStatus } from "../web3/web3";

class CreateCampaignPage extends Component {
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
            <Layout activeItem="Create" walletStatus={walletStatus}>
                <Segment 
                vertical
                style={{
                    minHeight: 1800
                }}>
                    <CreateCampaignFormScene />
                </Segment>
            </Layout>
        );
    }
}

export default CreateCampaignPage;