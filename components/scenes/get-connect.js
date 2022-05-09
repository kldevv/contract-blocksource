import React, { Component } from "react";
import { Container, Header, Segment, Icon} from "semantic-ui-react";
import WalletButtonPrimary from "../components/WalletButtonPrimary";

class GetConnectScene extends Component {
    render() {
        const { walletStatus } = this.props;
        return (
            <Segment
            vertical
            style={{ 
                minHeight: 500, 
                padding: '10em 0em 10em 0em' 
            }}>
                <Container text textAlign="center" >
                    <Icon size="massive" name="power"/>
                    <Header
                    as='h1'
                    content='You need an Ethereum wallet to use TheCampaigns.'
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '1.5em',
                        marginTop: "1em",
                    }}
                    />
                    <WalletButtonPrimary walletStatus={walletStatus}/>
                </Container>
            </Segment>
        );
    }
}

export default GetConnectScene;