import React, {Component} from "react";
import { Icon, Header} from "semantic-ui-react";
import config from "../../../../config";

import BetaTag from "../../../beta/BetaTag";

const { isBeta } = config;

class LogoBlack extends Component {
    render() {
        return (
            <Header
            style={{
                paddingLeft : "5px",
                color: "rgb(4, 17, 29)",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bolder",
            }}>
                    <Header.Content>
                    <Icon 
                    name="paper plane" 
                    size="large"
                    style={{
                        color: "rgb(117, 117, 244)",
                        paddingRight:"0.1px"
                    }}/>
                    TheCampaigns
                    <BetaTag isBeta={isBeta}/>
                    </Header.Content>
            </Header>
        );
    }
}

export default LogoBlack;