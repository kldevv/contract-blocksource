import React, {Component} from "react";
import Link from "next/link";
import { Container, Header, Segment, Icon, Grid, Divider} from "semantic-ui-react";
import LogoInverted from "./LogoInverted";

class Footer extends Component {
    render() {
        return (
            <div>
            <Segment
            inverted 
            vertical 
            style={{
            backgroundColor: "#C0C0F7",
            padding: "2em 0em"
            }}>
                <Container text textAlign="center">
                    <Header
                    as='h6'
                    content="Welcome any kind of partnership"
                    style={{
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                        fontSize: '1.5em',
                        marginTop: "0em",
                    }} />
                </Container>
            </Segment>
            <Segment 
            inverted 
            vertical 
            style={{
            backgroundColor: "#7575F4",
            padding: "5em 0em 15em 0em"
            }}>
                <Container>
                <Divider section />
                <LogoInverted />
                </Container>
            </Segment>
            </div>
        );
    };
}

export default Footer;