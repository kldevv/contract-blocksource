import React, { Component } from "react";
import { Segment, Icon, Container, Menu, Grid, Card, Header } from "semantic-ui-react";
import RequestCard from "./request-explorer/RequestCard";


class RequestExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "All",
            requests: [],
            address: "0x0",
            walletStatus: "not received",
            requestStatusEnum: {
                0: "Active",
                1: "Resolved",
                2: "Approved",
                3: "Cancelled",
                4: "Rejected",
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { requests, isOwner, walletStatus, address } = props;
        return {
            requests,
            isOwner,
            walletStatus,
            address,
        };
    }

    renderRequestCard = () => {
        const { requests, requestStatusEnum, activeItem, isOwner, walletStatus, address } = this.state;
        const requestCards = requests.map((request, idx) => {
            if (requestStatusEnum[request.status] === activeItem || activeItem === "All")
                return (
                <RequestCard
                request={request} 
                requestStatusEnum={requestStatusEnum} 
                isOwner={isOwner} 
                walletStatus={walletStatus}
                address={address}
                key={idx}
                />
                );
            else
                return null;
        });
        return requestCards;
    }

    renderMenuItems = () => {
        const { requestStatusEnum, activeItem } = this.state;
        const items = ["All"];
        for (let key in requestStatusEnum) {
            const item = requestStatusEnum[key];
            items.push(item);
        }
        const menuItems = items.map((item, idx) => {
            return (
                <Menu.Item
                link
                content={item}
                key={idx}
                onClick={() => this.setState({activeItem: item})}
                active={activeItem===item}
                style={{
                    color: (activeItem===item) ? "rgb(117, 117, 244)" : "",
                    fontWeight:  (activeItem===item) ? "bold" : "",
                }} />
            );
        });
        return menuItems;
    }

    render() {
        const { activeItem, requests, requestStatusEnum } = this.state;
        return (
            <Container 
            fluid 
            style={{
                marginBottom: "0em",
                fontFamily: "Poppins, sans-serif"
            }}>
                <Grid 
                celled
                columns={2}
                style={{
                    minHeight: "1500px",
                    marginBottom: "-2em"
                }}>
                    <Grid.Column width={3} stretched>
                        <Menu 
                        text 
                        borderless 
                        vertical>
                            <Menu.Item />
                            <Menu.Item
                            style={{
                                fontWeight: "bold",
                                color: "black"
                            }}> Request Status </Menu.Item>
                            {this.renderMenuItems()}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid.Row style={{
                            marginTop: "2em",
                            marginBottom: "2em"
                        }}>
                            <Header as="h4">
                                Found {requests.filter(request => (requestStatusEnum[request.status] === activeItem || activeItem === "All")).length} requests.
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Card.Group>
                                {this.renderRequestCard()}
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Container>    
        );
    }
}

export default RequestExplorer;