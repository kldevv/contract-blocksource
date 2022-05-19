import { Component } from "react";
import { Button } from "semantic-ui-react";
import { connectMetaMask } from "../../../web3/lib/wallet";


class WelcomeWalletButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : false,
            account: "0x0",
            walletStatus: "not received"
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { walletStatus, account } = props;
        return {
            walletStatus,
            account: account
        };
    }

    onClick = async () => {
        this.setState({
            isLoading: true
        });
        await connectMetaMask();
        this.setState({
            isLoading: false
        });
        window.location.reload();
    }

    render() {
        const { account, walletStatus } = this.state;
        let content;
        let onClickHandler = null;
        let disabled = false;
        
        switch (walletStatus) {
            case "enabled":
                content = "Connect Wallet";
                onClickHandler = this.onClick;
                break;
            case "connected":
                content = "Hi, " + account.slice(0, 8) + "...";
                disabled = true;
                break;
            case "disabled":
            default:
                content = "Wallet Not Installed";
                disabled = true;
                break;
        }

        return (
            <Button
            loading={this.state.isLoading}
            size="huge"
            style={{ 
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "rgb(117, 117, 244)",
                color: "white"
            }}
            onClick={onClickHandler}
            disabled={disabled}
        > {content} </Button>
        );
    }
}

export default WelcomeWalletButton;