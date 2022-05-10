import React, { Component } from "react";
import { Container, Icon, Header, Menu } from "semantic-ui-react";

class ViewMetaScene extends Component {
    render() {
        const { campaignInfo } = this.props;
        const {
            name,
            description,
            address,
            patronCount,
            owner
        } = campaignInfo;
        return (
            <Container text textAlign="center">
                <Icon.Group>
                    <Icon
                    name='paper plane'
                    circular
                    size="massive"
                    style={{
                        color: "white",
                        backgroundColor:"rgb(117, 117, 244)",
                        marginTop: "-1em",
                    }}
                    />
                </Icon.Group>
                <Header>
                    <Header.Content>
                    {name}
                    </Header.Content>
                    <br />
                    <Header.Content>
                    {"At " + address}
                    </Header.Content>
                </Header>
                <Menu compact>
                    <Menu.Item link>
                        {patronCount}
                    </Menu.Item>
                    <Menu.Item link>
                        Hello
                    </Menu.Item>
                    <Menu.Item link>
                        World
                    </Menu.Item>
                </Menu>
                <Header>
                    {description}
                </Header>
            </Container>
        );
    }
}

export default ViewMetaScene;