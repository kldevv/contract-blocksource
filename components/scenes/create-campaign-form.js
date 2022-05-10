import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import NewCampaignForm from "../components/NewCampaginForm";

class CreateCampaignFormScene extends Component {
    render() {
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
                    <NewCampaignForm />
                </Container>
            </Container>
        );
    }
}

export default CreateCampaignFormScene;