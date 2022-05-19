import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Meta from "./layout/Meta";
import HeaderMenu from "./layout/LayoutHeader";
import Footer from "./layout/LayoutFooter";

class Layout extends Component {
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
        const { activeItem, children} = this.props;
        const { walletStatus, account } = this.state;
        return (
            <Container fluid>
                <Meta />
                <HeaderMenu activeItem={activeItem} walletStatus={walletStatus} account={account}/>
                    {children}
                <Footer />
            </Container>
        );
    }
};

export default Layout;