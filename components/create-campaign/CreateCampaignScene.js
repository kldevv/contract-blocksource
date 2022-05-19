import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import NewCampaignForm from "./create-campaign-scene/NewCampaginForm";

class CreateCampaignScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received"
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { walletStatus } = props;
        return {
            walletStatus
        };
    }
    render() {
        const { walletStatus } = this.state;
        return (
            <Container text textAlign="center">
                <Header
                    as='h1'
                    content="Create New Campaign"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3em',
                        marginTop: "2em",
                        marginBottom: "1em",
                }} />
                <Container textAlign="left">
                    <NewCampaignForm walletStatus={walletStatus} />
                </Container>
            </Container>
        );
    }
}

export default CreateCampaignScene;