import React, {Component} from "react";
import { Icon, Header} from "semantic-ui-react";
import BetaTag from "./BetaTag";
import config from "../../config";

const { isBeta } = config;

class LogoInverted extends Component {
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

export default LogoInverted;