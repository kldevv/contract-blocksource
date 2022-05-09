import React, { Component } from "react";
import { Container, Header, Segment} from "semantic-ui-react";
import WalletButtonPrimary from "../components/WalletButtonPrimary";
import Logo from "../components/Logo";

class LandingWelcomeScene extends Component {

    render() {
        const { walletStatus } = this.props;
        return (
            <Segment
            vertical
            style={{ 
                minHeight: 700, 
                padding: '5em 0em 5em 0em' 
            }}>
                <Container text textAlign="center" >
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
                    <WalletButtonPrimary walletStatus={walletStatus}/>
                </Container>
            </Segment>
        );
    }
}

export default LandingWelcomeScene;