import React, {Component} from "react";
import { Container, Header, Segment, Icon, Grid} from "semantic-ui-react";

class Footer extends Component {
    render() {
        return (
            <Segment 
            inverted 
            vertical 
            style={{
                backgroundColor: "rgb(4, 17, 29)",
                padding: "4em 0em"
            }}>
                <Container text>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column>
                                HelloWorld
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    };
}

export default Footer;