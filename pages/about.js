import React, { Component } from "react";
import { Container, Header, Segment, Icon } from "semantic-ui-react";
import Layout from "../components/components/Layout";
import { getWalletStatus } from "../web3/web3";

class AboutPage extends Component {
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
            <Layout activeItem="About" walletStatus={ walletStatus }>
            <Container textAlign="left" style={{ padding: "5em 0em "}}>
                <Header
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3.5em',
                        marginTop: "1em",
                    }}
                >
                    <Header.Content>
                        About <span/>
                        <Icon name="lightbulb outline"/>
                    </Header.Content>
                </Header>
                <p style={{
                    color: "rgb(95, 95, 95)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "normal",
                    fontSize: '1.5em',
                }}>
                    TheCampaigns is a place that enables Ethereum wallet owners to create and list their startup campaigns and seek for the potential investors.
                    <br/><br/>
                    Collected fund will be locked in a smart contract, waiting for the campaign funder to issue a descriptive request. Once the request is approved by more than half of the patrons, the campaign funder can then resolve it and send the approved amount to the recipient.
                </p>
                <Header 
                    as="h2"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3.5em',
                        marginTop: "1.5em",
                    }}
                >
                    <Header.Content>
                        How It Works <span/>
                        <Icon name="question circle outline"/>
                    </Header.Content>
                </Header>
                <Header
                    as="h2"
                    content="As a Funder"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                    }}
                />
                <p style={{
                    color: "rgb(95, 95, 95)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "normal",
                    fontSize: '1.5em',
                }}>
                    TheCampaigns is a place that enables Ethereum wallet owners to create and list their startup campaigns and seek for the potential investors.
                    <br/><br/>
                    Collected fund will be locked in a smart contract, waiting for the campaign funder to issue a descriptive request. Once the request is approved by more than half of the patrons, the campaign funder can then resolve it and send the approved amount to the recipient.
                </p>
                <Header
                    as="h2"
                    content="As an Investor"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                    }}
                />

                <Header 
                    as="h2"
                    style={{
                        color: "rgb(117, 117, 244)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3.5em',
                        marginTop: "1.5em",
                    }}
                >
                    <Header.Content>
                        Meet Developers <span/>
                        <Icon name="fork"/>
                    </Header.Content>
                </Header>
            </Container>
            </Layout>
        );
    }
}

export default AboutPage;