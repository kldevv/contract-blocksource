import React, { Component } from "react";
import { Card, Container, Header, Segment } from "semantic-ui-react";
import CampaignCard from "../components/CampaignCard";

class ExploreCampaignListScene extends Component {
    renderCampaignCards() {
        const campaignInfo = {
            name: "test",
            description: "test",
            address: "0x0",
            patronCount: 3,
            openRequestCount: 10
        }
        const campaigns = [...Array(10)].map((_) => campaignInfo);
        const campaignCards = campaigns.map((obj, idx) => {
            return <CampaignCard campaignInfo={campaignInfo} id={idx} key={idx}/>;
        });
        return campaignCards;
    }


    render() {
        return (
            <Segment 
            vertical
            style={{ 
                minHeight: 1000,
                padding: "2em 0em 2em 0em"
            }}>
                <Card.Group centered>
                    {this.renderCampaignCards()}
                </Card.Group>
            </Segment>
        );
    }
}

export default ExploreCampaignListScene;