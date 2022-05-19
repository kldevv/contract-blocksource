import React, { Component } from "react";
import { Segment, Icon, Container, Menu, Grid, Table, Tab} from "semantic-ui-react";

const eventTypes = {
    CampaignCreated: "Campaign Created",
    ContributionMade: "Contribution Made",
    RequestIssued: "Request Issued",
    RequestVoted: "Request Voted",
    RequestResolved: "Request Resolved",
    RequestCancelled: "Request Cancelled",
    CampaignLocked: "Campaign Locked",
    CampaignUnlocked: "Campaign Unlocked"
}

class EventExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "All"
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { events } = props;
        return {
            events
        };
    }

    renderEventRow(type, des, blockNumber, idx) {
        return (
            <Table.Row key={idx}>
                <Table.Cell>{type}</Table.Cell>
                <Table.Cell>{des}</Table.Cell>
                <Table.Cell>{blockNumber}</Table.Cell>
            </Table.Row>
        );
    }

    renderEventTable() {
        const { events, activeItem } = this.state;
        const eventTable = events.map(({event, returnValues, blockNumber}, idx) => {
            if (eventTypes[event] === activeItem || activeItem === "All") {
                console.log(returnValues[0]);
                return this.renderEventRow(eventTypes[event], "", blockNumber, idx);
            }
        });
        return eventTable;
    }

    renderMenuItems = () => {
        const { activeItem } = this.state;
        const items = ["All"];
        for (let key in eventTypes) {
            const item = eventTypes[key];
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
        // const { events } = this.state;
        // console.log(events);
        return (
            <Container fluid style={{
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
                        <Menu fluid text borderless vertical>
                            <Menu.Item />
                            <Menu.Item
                            style={{
                                fontWeight: "bold",
                                color: "black"
                            }}> Event Type </Menu.Item>
                            {this.renderMenuItems()}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Table celled widths={3}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={3}>Type</Table.HeaderCell>
                                    <Table.HeaderCell width={9}>Description</Table.HeaderCell>
                                    <Table.HeaderCell width={6}>Block Number</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderEventTable()}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Container>    
        );
    }
}

export default EventExplorer;