import React, { Component } from "react";
import { Button, Container, Header, Segment, Icon, Grid, Divider} from "semantic-ui-react";
import Layout from "../components/Layout";

class LandingPage extends Component {
    render() {
        return (
            <Layout>
            <Container text textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }}>
                <Header
                as='h1'
                content='Discover, create, and participate on-chain campaigns'
                style={{
                    color: "rgb(4, 17, 29)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bolder",
                    fontSize: '3.5em',
                    marginTop: "2em",
                }}
                />
                <Header
                as='h2'
                content='TheCampaigns is an exciting project that solves real business problems with the power of blockchain'
                style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: '1.7em',
                    color: "rgb(53, 56, 64)",
                    fontWeight: 'bold',
                    marginTop: '1.5em',
                    marginBottom: '1.5em',
                }}
                />
                <Button
                    size="huge"
                    content="Connect Wallet"
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        backgroundColor: "rgb(117, 117, 244)", 
                        color: "white"
                    }}
                />
            </Container>
            <Segment 
                inverted 
                vertical
                style={{ 
                    minHeight: 700, 
                    padding: '1em 0em',
                    backgroundColor: "rgb(117, 117, 244)"
            }}>
                <Container text textAlign="left">
                    <Header
                        as='h1'
                        content="Explore all the Exciting Campaigns"
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "bolder",
                            fontSize: '5em',
                            marginTop: "1.5em",
                            color: "white"
                        }}
                    />
                    <Header
                        as='h2'
                        content='Find your ideal investing opportunities'
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: '1.7em',
                            color: "rgb(53, 56, 64)",
                            fontWeight: 'bold',
                            marginTop: '0.5em',
                            marginBottom: '1.5em',
                            }}
                    />
                    <Button
                        size="huge"
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            backgroundColor: "white", 
                            color: "rgb(117, 117, 244)"
                        }}
                    >
                        <Button.Content>
                        <Icon name="compass outline"/>
                        Explore
                        </Button.Content>
                    </Button>
                </Container>
            </Segment>
            <Segment 
                inverted 
                vertical 
                textAlign="center" 
                style={{ 
                    minHeight: 700, 
                    padding: '0.5em 0em',
                    backgroundColor: "white",
                    color: "rgb(4, 17, 29)",
                }}>
                <Container text>
                <Header
                    as="h1"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3.5em',
                        marginTop: "1.5em",
                        marginBottom: "0.5em"
                    }}
                >
                    <Header.Content style={{ color: "rgb(117, 117, 244)"}}>
                        Understand
                        <Icon name="arrow alternate circle right outline"/>
                    </Header.Content>
                    <Header.Content>
                        TheCampaigns
                    </Header.Content>
                </Header>
                <Button
                    size="huge"
                    content="Know More"
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        backgroundColor: "rgb(117, 117, 244)", 
                        color: "white",
                    }}
                />
                <Grid columns={2} divided inverted stackable style={{ paddingBottom: "2em"}}>
                    <Grid.Column>
                    <Header
                        as="h4"
                        content="Become a Funder"
                        style={{
                            color: "rgb(53, 56, 64)",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "bolder",
                            fontSize: '2em',
                            marginTop: "1.5em",
                            marginBottom: "1em"
                        }}
                    />
                    <Icon name="coffee" size="huge" style={{color: "rgb(53, 56, 64)"}}/>
                    <p style={{
                        color: "rgb(95, 95, 95)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                        fontSize: '1.5em',
                        paddingTop: "1.5em",
                    }}>
                        Create your startup campaign and secure funding with ETH on the blockchain network
                    </p>
                    </Grid.Column>
                    <Grid.Column>
                    <Header
                        as="h4"
                        content="Become a Patron"
                        style={{
                            color: "rgb(53, 56, 64)",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "bolder",
                            fontSize: '2em',
                            marginTop: "1.5em",
                            marginBottom: "1em"
                        }}
                    />
                    <Icon name="users" size="huge" style={{color: "rgb(53, 56, 64)"}}/>
                    <p style={{
                        color: "rgb(95, 95, 95)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                        fontSize: '1.5em',
                        paddingTop: "1.5em",
                    }}>
                        Explore open investing opportunities and never worry about embezzlement
                    </p>
                    </Grid.Column>
                </Grid>
                </Container>
            </Segment>
            </Layout>
        )
    }
}

export default LandingPage;