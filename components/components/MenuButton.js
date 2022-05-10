import { Component } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

class MenuButton extends Component {
    render() {
        const { isActive, content, href } = this.props;
        return (
          <Link href={href}>
                <Menu.Item 
                active={isActive} 
                style={{
                    border: "1px solid rgb(4, 17, 29)",
                    borderColor: "rgb(117, 117, 244)",
                    borderWidth: "0.25em",
                    fontSize: "15px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    ...(isActive ? {borderStyle: "none none solid none"} : {borderStyle: "none none none none"}), 
                    ...(isActive ? {color: "rgb(4, 17, 29)"} : {color: "rgb(95, 95, 95)"}), 
                }}>
                    {content}
                </Menu.Item>
            </Link>  
        );
    }
}

export default MenuButton;