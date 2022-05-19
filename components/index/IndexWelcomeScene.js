import React, { Component } from "react";
import { Container, Header, Segment} from "semantic-ui-react";
import WelcomeWalletButton from "./index-welcome-scene/WelcomeWalletButton";

class IndexWelcomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            account: "0x0"
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { walletStatus, account } = props;
        return {
            walletStatus,
            account
        };
    }

    render() {
        const { walletStatus, account } = this.state;
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
                    <WelcomeWalletButton walletStatus={walletStatus} account={account}/>
                </Container>
            </Segment>
        );
    }
}

export default IndexWelcomeScene;