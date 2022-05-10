import React, { Component } from "react";
import { Menu, Icon} from "semantic-ui-react";
import Link from "next/link";
import MenuButton from "./MenuButton";
import WalletButtonSecondary from "./WalletButtonSecondary";
import Logo from "./Logo";

class HeaderMenu extends Component {
    render() {
        const { activeItem, walletStatus} = this.props
        return (
            <Menu 
            borderless 
            size="huge" 
            tabular
            fixed="top"
            style={{ 
                "borderRadius": "0px",
                backgroundColor: "white",
                marginBottom: "1rem",
                boxShadow: "1px 1px 15px rgb(150, 150, 150, 0.3) !important",
                zIndex: "200000"
            }}>
                <Link href="/">
                    <Menu.Item>
                        <Logo />
                    </Menu.Item>
                </Link>
                <Menu.Menu position="right">
                    <MenuButton content="Explore" href="/explore-campaigns" isActive={activeItem === "Explore"}/>
                    <MenuButton content="Create" href="/create-campaign" isActive={activeItem === "Create"}/>
                    <MenuButton content="About" href="/about" isActive={activeItem === "About"}/>
                    <Menu.Item>
                        <WalletButtonSecondary walletStatus={walletStatus}/>
                    </Menu.Item>
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

export default HeaderMenu;