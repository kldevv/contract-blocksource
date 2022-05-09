import { Component } from "react";
import { Button } from "semantic-ui-react";
import { connectMetaMask } from "../../web3/web3";
import Web3 from "web3";


class WalletButtonPrimary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : false,
            accounts: undefined
        };
    }
    async componentDidMount() {
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            this.setState({
                accounts
            });
        } catch (err) {
            console.log(err);
        }
    }

    onClick = async () => {
        this.setState({
            isLoading: true
        });
        await connectMetaMask();
        this.setState({
            isLoading: false
        });
    }

    render() {
        const { walletStatus } = this.props;
        const { accounts } = this.state;
        let content;
        let onClickHandler = null;
        let disabled = false;
        let accountAbbr = "0x0";
        if (typeof accounts !== "undefined" && accounts.length > 0) {
            accountAbbr = accounts[0].slice(0, 8);
        }
        switch (walletStatus) {
            case "enabled":
                content = "Connect Wallet";
                onClickHandler = this.onClick;
                break;
            case "connected":
                content = "Hi, " + accountAbbr + "...";
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

export default WalletButtonPrimary;