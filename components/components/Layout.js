import React from "react";
import { Container } from "semantic-ui-react";
import Meta from "./Meta";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";

const Layout = (props) => {
    const { walletStatus, activeItem, children} = props;
    return (
        <Container fluid>
            <Meta />
            <HeaderMenu activeItem={activeItem} walletStatus={walletStatus}/>
                {children}
            <Footer />
        </Container>
    );
};

export default Layout;