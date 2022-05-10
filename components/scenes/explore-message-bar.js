import React, { Component } from "react";
import { Container, Header, Segment, Grid} from "semantic-ui-react";

class ExploreMessageBarScene extends Component {
    render() {
        const { content, backgroundColor } = this.props;
        return (
            <Segment 
            vertical
            style={{ 
                minHeight: 200,
                padding: "1em 0em 1em 0em",
                backgroundColor: backgroundColor,
            }}>
                <Container text textAlign="center">
                    <Header
                    as='h1'
                    content={content}
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3em',
                        marginTop: "2em",
                    }} />
                </Container>
            </Segment>
        );
    }
}

export default ExploreMessageBarScene;