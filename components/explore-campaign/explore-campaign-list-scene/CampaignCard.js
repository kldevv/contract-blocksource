import React, { Component } from "react";
import { Icon, Card, Segment, Popup} from "semantic-ui-react";
import Link from "next/link";


class CampaignCard extends Component {
    render() {
        const { id } = this.props;
        const alternateBackgroundColor = (id % 2) ? "rgb(117, 117, 244)" : "rgb(95, 95, 95)";
        
        const { campaignInfo } = this.props;
        const {
                address,
                name,
                description,
                isLocked,
                patronCount,
        } = campaignInfo;
        
        return (
            <Link href={`/campaign/${address}`}>
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
                        <Popup
                        style={{
                            fontFamily: "Poppins, sans-serif",
                        }}
                        content={isLocked ? "This campaign is locked." : "This campaign is open."}
                        trigger={
                            <Icon 
                            circular
                            name={isLocked ? "lock" : "check"}
                            size="small"
                            style={{
                                color: isLocked ? "white" : "rgb(4, 17, 29)",
                                backgroundColor: isLocked ? "rgb(4, 17, 29)" : "white",
                            }}/>
                        }/>
                    </Segment>
                    <Card.Content textAlign="center">
                        <Card.Header>
                            {name}
                        </Card.Header>
                        <Card.Meta>{"At "}{address.slice(0, 6)+"..."}</Card.Meta>
                        <Card.Description>{description.slice(0, 200) + (description.length > 200 ? "..." : "")}</Card.Description>
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