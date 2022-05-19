import React, {Component} from "react";
import { Icon, Header} from "semantic-ui-react";
import config from "../../../../config";

import BetaTag from "../../../beta/BetaTag";

const { isBeta } = config;

class LogoWhite extends Component {
    render() {
        return (
            <Header
            style={{
                paddingLeft : "5px",
                color: "white",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bolder",
            }}>
                    <Header.Content>
                    <Icon 
                    name="paper plane outline" 
                    size="large"
                    style={{
                        color: "white",
                        paddingRight:"0.1px"
                    }}/>
                    TheCampaigns
                    <BetaTag isBeta={isBeta}/>
                </Header.Content>
            </Header>
        );
    }
}

export default LogoWhite;