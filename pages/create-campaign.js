import React, { Component } from "react";
import { Container, Header, Segment} from "semantic-ui-react";
import Layout from "../components/components/Layout";

class CreateCampaignPage extends Component {
    render() {
        return (
            <Layout activeItem="Create">
            <Segment vertical style={{ minHeight: 700}}>
                <Container text textAlign="center">
                <Header
                    as='h1'
                    content="Create New Campaigns"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3em',
                        marginTop: "2em",
                }} />
                </Container>
            </Segment>
            </Layout>
        );
    }
}

export default CreateCampaignPage;