import React from "react";
import { Container, Sticky } from "semantic-ui-react";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <div>
            <Meta />
            <Container fluid>
            <Header />
                {props.children}
            <Footer />
            </Container>
        </div>
    );
};

export default Layout;