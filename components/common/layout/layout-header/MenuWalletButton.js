import { Component } from "react";
import { Button } from "semantic-ui-react";
import { connectMetaMask } from "../../../../web3/lib/wallet";


class MenuWalletButton extends Component {
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

    connectMetaMask = async () => {
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
        let color;
        let onClickHandler = null;
        let disabled = false;

        switch (walletStatus) {
            case "enabled":
                content = "Connect Wallet";
                color = "rgb(117, 117, 244)";
                onClickHandler = this.connectMetaMask;
                break;
            case "connected":
                color = "rgb(95, 95, 95)";
                content = "Hi, " + account.slice(0, 8) + "...";
                disabled = true;
                break;
            case "disabled":
            default:
                color = "rgb(95, 95, 95)";
                content = "Wallet Not Installed";
                disabled = true;
                break;
        }

        return (
            <Button
            loading={this.state.isLoading}
            style={{ 
                fontSize: "15px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                backgroundColor: "white",
                color: color
            }}
            onClick={onClickHandler}
            disabled={disabled}
        > {content} </Button>
        );
    }
}

export default MenuWalletButton;