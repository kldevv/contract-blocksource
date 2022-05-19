import React, { Component } from "react";
import { Segment, Icon, Container } from "semantic-ui-react";


class CampaignHeaderBarScene extends Component {
    render() {
        return (
            <Segment 
            vertical
            style={{
                minHeight: 200,
                maxHeight: 200,
                backgroundColor: "rgb(117, 117, 244)",
                zIndex: 0
            }}>
            </Segment>
        );
    }
}

export default CampaignHeaderBarScene;


