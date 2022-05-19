import React, { Component } from "react";
import { Segment, Icon, Container, Menu } from "semantic-ui-react";
import RequestExplorer from "./campaign-explorer-scene/RequestExplorer";
import EventExplorer from "./campaign-explorer-scene/EventExplorer";
import IssueRequestExplore from "./campaign-explorer-scene/IssueRequestExplorer";


const activeItemEnum = {
    "Requests": 0,
    "Events": 1,
    "Issue Request": 2
}

class CampaignExplorerScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "Requests",
            requests: [],
            events: [],
            address: "0x0",
            walletStatus: "not received",
            isOwner: false,
            isLocked: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { requests, isOwner, walletStatus, address, isLocked, events } = props;
        return {
            requests,
            isOwner,
            walletStatus,
            address,
            isLocked,
            events
        };
    }

    renderExplorerWindow = () => {
        const { activeItem, requests, isOwner, walletStatus, address, events } = this.state;
        if (activeItem === "Requests") {
            return (
                <RequestExplorer 
                requests={requests} 
                isOwner={isOwner} 
                walletStatus={walletStatus} 
                address={address}/>
            );
        } else if (activeItem === "Events") {
            return (
                <EventExplorer events={events}/>
            );
        }
        else {
            return (
                <IssueRequestExplore walletStatus={walletStatus} address={address}/>
            );
        }
    }

    renderMenuItems = () => {
        const { activeItem, isOwner, isLocked } = this.state;

        const itemFlag = {
            0: "block layout",
            1: "bookmark",
            2: "copy"
        }

        const items = []
        for (let key in activeItemEnum) {
            if (!(isOwner && isLocked) && activeItemEnum[key] === activeItemEnum["Issue Request"]) {
                continue;
            }
            const item = (
                <Menu.Item 
                link
                onClick={() => {this.setState({activeItem: key});}}
                active={activeItem===key}
                key={activeItemEnum[key]}
                style={{
                    maxWidth: "150px",
                }}>
                    <Icon name={itemFlag[activeItemEnum[key]]} style={{color: "rgb(117, 117, 244)"}}/>
                    {key}
                </Menu.Item>
            );
            items.push(item);
        }
        return items;
    }

    render() {
        const { isLocked, isOwner } = this.state;
        return (
            <Segment 
            vertical
            style={{
                minHeight: "1000",
                backgroundColor: "white",
            }}>
                <Container 
                fluid 
                textAlign="center" 
                style={{
                    fontFamily: "Poppins, sans-serif",
                }}>
                    <Menu position="center" compact tabular fluid widths={(isOwner && isLocked) ? 3 : 2}>
                        {this.renderMenuItems()}
                    </Menu>
                </Container>
                {this.renderExplorerWindow()}
            </Segment>
        );
    }
}

export default CampaignExplorerScene;