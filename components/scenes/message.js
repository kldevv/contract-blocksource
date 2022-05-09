import React, { Component } from "react";
import { Container, Header, Segment, Icon, Grid} from "semantic-ui-react";

class MenuMessageScene extends Component {
    render() {
        return (
            <Segment 
            vertical
            style={{ 
                minHeight: 50,
                padding: "1em 0em 1em 0em"
            }}>
                <Container text textAlign="center">
                    <Header
                    as='h1'
                    content="Explore Campaigns"
                    style={{
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bolder",
                        fontSize: '3em',
                        marginTop: "2em",
                    }} />
                    <Grid column={3} style={{ marginTop: "2em" }}>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default MenuMessageScene;