import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Header, Segment, Icon} from "semantic-ui-react";


class LandingExploreScene extends Component {
    render() {
        return (
            <Segment 
            inverted 
            vertical
            style={{ 
                minHeight: 700, 
                padding: '5em 0em 5em 0em',
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
                        marginTop: "0.5em",
                        color: "white"
                    }}/>
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
                    }}/>
                    <Link href="explore-campaigns">
                        <Button
                        size="huge"
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            backgroundColor: "white", 
                            color: "rgb(117, 117, 244)"
                        }}>
                            <Button.Content>
                            <Icon name="compass outline"/>
                            Explore
                            </Button.Content>
                        </Button>
                    </Link>
                </Container>
            </Segment>
        );
    }
}

export default LandingExploreScene;