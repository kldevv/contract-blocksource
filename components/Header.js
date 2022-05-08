import React, {Component} from "react";
import { Menu, Icon, Button} from "semantic-ui-react";
import Link from "next/link";

class Header extends Component {
    render() {
        return (
            <Menu 
                borderless 
                size="huge" 
                tabular
                fixed="top"
                style={{ 
                    "borderRadius": "0px",
                    backgroundColor: "white"
                }}
            >
                <Link href="/">
                    <Menu.Item>
                        <Icon.Group size="large">
                            <Icon name="paper plane" className="theme1"/>
                            {/* <Icon name="user plus" corner className="theme1" /> */}
                        </Icon.Group>
                        <text 
                            className="logo" 
                            style={{
                                paddingLeft : "5px",
                                color: "rgb(4, 17, 29)"
                            }}
                        >TheCampaigns</text>
                    </Menu.Item>
                </Link>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button 
                            className="menu-font"
                            style={{ 
                                fontSize: "15px",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "bold",
                                color: "rgb(117, 117, 244)", 
                                backgroundColor: "white"
                            }}
                        >
                            Connect Wallet
                        </Button>
                    </Menu.Item>
                    <Link href="/">
                        <Menu.Item>
                            <text className="menu-font">Explore</text>
                        </Menu.Item>
                    </Link>
                    <Link href="/">
                        <Menu.Item>
                            <text className="menu-font">Create</text>
                        </Menu.Item>
                    </Link>
                    <Link href="/about">
                        <Menu.Item>
                            <text className="menu-font">About</text>
                        </Menu.Item>
                    </Link>
                    <Link href="https://github.com/linstudyhard9527/contract-blocksource.git" passHref>
                        <Menu.Item>
                            <Icon name="github" size="large" color="black"/>
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
        );
    };
}

export default Header;