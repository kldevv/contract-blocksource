import React, { Component } from "react";
import { Card, Container, Header, Segment } from "semantic-ui-react";
import CampaignCard from "./explore-campaign-list-scene/CampaignCard";

// const dummyCampaignInformation = [{
//     address: "0x0",
//     name: "Demo",
//     description: "This campaign is an off-chain demo. It serves as the demonstration of the frontend page. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     isLocked: true,
//     activeBalance: 67000,
//     totalBalance: 80000,
//     patronCount: 567,
//     activeRequestCount: 12,
//     requestCount: 93
// }]


class ExploreCampaignListScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCampaignInfo: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { allCampaignInfo } = props;
        return {
            allCampaignInfo
        };
    }

    renderCampaignCards = () => {
        const { allCampaignInfo } = this.state;
        const campaignCards = allCampaignInfo.map((obj, idx) => {
            return <CampaignCard campaignInfo={obj} id={idx} key={idx}/>;
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