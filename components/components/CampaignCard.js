import React, { Component } from "react";
import { Icon, Card, Segment} from "semantic-ui-react";
import Link from "next/link";

class CampaignCard extends Component {
    render() {
        const { id } = this.props;
        const alternateBackgroundColor = (id % 2) ? "rgb(117, 117, 244)" : "rgb(95, 95, 95)";
        
        const { campaignInfo } = this.props;
        const {
            name,
            description,
            address,
            patronCount,
        } = campaignInfo;
        
        return (
            <Link href="/campaign">
                <Card>
                    <Segment 
                    vertical
                    textAlign="center"
                    style={{
                        minHeight: "300px",
                        backgroundColor: alternateBackgroundColor
                    }}>
                        <Icon
                        name="paper plane" 
                        size="massive"
                        style={{
                            paddingTop: "0.5em",
                            color: "white"
                        }}/>
                    </Segment>
                    <Card.Content textAlign="center">
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{"At "}<Link href="/about" ><a>{address}</a></Link></Card.Meta>
                        <Card.Description>{description}</Card.Description>
                    </Card.Content>
                    <Card.Content textAlign="center" extra>
                            <Icon name="users" />
                            {patronCount} Patrons
                    </Card.Content>
                </Card>
            </Link>
        );
    }
}

export default CampaignCard;