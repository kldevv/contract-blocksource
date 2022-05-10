import React, { Component } from "react";
import { Segment } from "semantic-ui-react";


class ViewColorBarScene extends Component {
    render() {
        return (
            <Segment 
            vertical
            style={{
                minHeight: 200,
                backgroundColor: "#C0C0F7",
                zIndex: 0
            }}>
            </Segment>
        );
    }
}

export default ViewColorBarScene;


