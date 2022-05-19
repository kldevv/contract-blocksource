import {Header} from "semantic-ui-react";

const BetaTag = (props) => {
    if (props.isBeta) {
        return (
            <Header.Content
            style={{
                paddingLeft: "5px",
                fontSize: "12px",
                color: "#C0C0F7",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
            }}>BETA</Header.Content>
        );
    }
    return null;
}

export default BetaTag;