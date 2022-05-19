import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import NewRequestForm from "./issue-request-explorer/NewRequestForm";

class IssueRequestExplore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            address: "0x0"
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { walletStatus, address } = props;
        return {
            walletStatus,
            address
        };
    }

    render() {
        const { walletStatus, address } = this.state;
        return (
            <Container text textAlign="center">
                <Header
                    as='h1'
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '2em',
                        marginTop: "2em",
                        marginBottom: "1em",
                }}>
                    <Icon name="paper plane outline" size="mini"/>
                    Issue Request
                </Header>
                <Container textAlign="left">
                    <NewRequestForm walletStatus={walletStatus} address={address}/>
                </Container>
            </Container>
        );
    }
}

export default IssueRequestExplore;