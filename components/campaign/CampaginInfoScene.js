import React, { Component } from "react";
import { Container, Icon, Header, Menu, Popup } from "semantic-ui-react";
import Link from "next/link";

class CampaginInfoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignInfo: {},
            walletStatus: "not received",
            isOwner: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { campaignInfo, walletStatus, isOwner } = props;
        return {
            campaignInfo,
            walletStatus,
            isOwner
        };
    }

    render() {
        const { campaignInfo, walletStatus, isOwner } = this.props;
        const {
                address,
                owner,
                name,
                description,
                minContribution,
                isLocked,
                activeBalance,
                totalBalance,
                patronCount,
                activeRequestCount,
                requestCount,
        } = campaignInfo;

        let isPatron = false;
        if (walletStatus === "connected") {
            isPatron = campaignInfo.isPatron;
        }
        return (
            <Container 
            text 
            textAlign="center"
            style={{
                fontFamily: "Poppins, sans-serif",
                marginBottom: "2em"
            }}>
                <Icon.Group>
                    <Icon
                    name='paper plane'
                    circular
                    size="massive"
                    style={{
                        color: "rgb(117, 117, 244)",
                        backgroundColor: "white",
                        marginTop: "-1em",
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
                            marginLeft: "8em",
                            marginTop: "5em"
                        }}/>
                    }/>
                </Icon.Group>
                <Header>
                    <Header.Content
                    style={{
                        fontSize: "2em",
                        fontWeight: "bolder",
                        color: "rgb(4, 17, 29)",
                    }}>
                    {name}
                    </Header.Content>
                    <br />
                    <Header.Content
                    style={{
                        fontSize: "0.6em",
                        fontWeight: "lighter",
                        marginTop: "1em",
                        color: "rgb(95, 95, 95)",
                    }}>
                    {"At "} <Icon name="file alternate outline"/> {address ? <Link href="/">{address}</Link> : "Unknown"} <br/>
                    {"Created by "} <Icon name="user outline"/> {owner ? <Link href="/">{owner}</Link> : "Unknown"}
                    </Header.Content>
                </Header>
                <Menu compact widths={4} style={{maxWidth: "40em", color: "rgb(4, 17, 29)",}}>
                    <Menu.Item link>
                        <Header>
                        <Header.Content>
                                <Icon name="users"/>
                                {patronCount}
                            </Header.Content>
                            <br/>
                            <Header.Content
                            style={{
                                fontSize: "0.6em",
                                fontWeight: "lighter",
                                color: "rgb(95, 95, 95)",
                            }}>
                                Patrons
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item link>
                        <Header>
                            <Header.Content>
                                <Icon name="ethereum"/>
                                {totalBalance}
                            </Header.Content>
                            <br/>
                            <Header.Content
                            style={{
                                fontSize: "0.6em",
                                fontWeight: "lighter",
                                color: "rgb(95, 95, 95)",
                            }}>
                            Total Balance
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item link>
                        <Header>
                            <Header.Content>
                                <Icon name="ethereum"/>
                                {activeBalance}
                            </Header.Content>
                            <br/>
                            <Header.Content
                            style={{
                                fontSize: "0.6em",
                                fontWeight: "lighter",
                                color: "rgb(95, 95, 95)",
                            }}>
                            Active Balance
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item link>
                        <Header>
                            <Header.Content>
                                <Icon name="ethereum" style={{
                                    color: "rgb(117, 117, 244)"
                                }}/>
                                { minContribution }
                            </Header.Content>
                            <br/>
                            <Header.Content
                            style={{
                                fontSize: "0.6em",
                                fontWeight: "lighter",
                                color: "rgb(95, 95, 95)",
                            }}>
                            Minimum Contribution
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                </Menu>
                <Header>
                    <Header.Content
                    style={{
                        fontSize: "0.6em",
                        fontWeight: "bold",
                        color: "rgb(4, 17, 29)",
                        fontFamily: "Poppins, sans-serif",
                    }}>
                        Campaign Description
                    </Header.Content>
                    <br />
                    <Header.Content
                    style={{
                        fontSize: "0.6em",
                        fontWeight: "lighter",
                        color: "rgb(95, 95, 95)",
                    }}>
                    {description}
                    </Header.Content>
                </Header>
                { 
                    (isOwner || isPatron) ? 
                    (
                        <Container style={{ marginTop: "1em"}}>
                            {
                                (isOwner ) ?
                                (
                                    <Popup 
                                    content= "You are the owner of this campaign"
                                    trigger={
                                        <Icon 
                                        name="chess king"
                                        circular
                                        style={{
                                            backgroundColor: "white",
                                            color: "rgb(117, 117, 244)"
                                        }}
                                        />
                                    }
                                    />
                                ) : null
                            }
                            {
                                (isPatron ) ?
                                (
                                    <Popup 
                                    content= "You are the patron of this campaign"
                                    trigger={
                                        <Icon 
                                        name="chess pawn"
                                        circular
                                        style={{
                                            backgroundColor: "#C0C0F7",
                                            color: "white"
                                        }}
                                        />
                                    }
                                    />
                                ) : null
                            }
                        </Container>
                    ): null 
                }
            </Container>
        );
    }
}

export default CampaginInfoScene;