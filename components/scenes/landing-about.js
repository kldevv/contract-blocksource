import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Header, Segment, Icon, Grid} from "semantic-ui-react";
import Logo from "../components/Logo";

class LandingAboutScene extends Component {
    render() {
        return (
            <Segment 
            inverted 
            vertical 
            style={{ 
                minHeight: 700,
                padding: '5em 0em 5em 0em',
                backgroundColor: "white",
                color: "rgb(4, 17, 29)",
            }}>
                <Container text textAlign="center">
                <Header
                as="h1"
                style={{
                    color: "rgb(4, 17, 29)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bolder",
                    fontSize: '3.5em',
                    marginTop: "0.5em",
                    marginBottom: "0.5em"
                }}>
                    <Header.Content style={{ color: "rgb(117, 117, 244)"}}>
                        Understand
                        <Icon name="arrow alternate circle right outline"/>
                    </Header.Content>
                    <Header.Content>
                        TheCampaigns
                    </Header.Content>
                </Header>
                <Link href="/about">
                    <Button
                    size="huge"
                    content="Learn More"
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        backgroundColor: "rgb(117, 117, 244)", 
                        color: "white",
                    }}/>
                </Link>
                <Grid columns={2} inverted stackable style={{ paddingBottom: "2em"}}>
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
                    }}/>
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
                    }}/>
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
        );
    }
}

export default LandingAboutScene;