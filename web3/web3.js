import Web3 from "web3";

const checkWeb3Enabled = () => {
    return (typeof window !== "undefined" 
    && typeof window.ethereum !== "undefined");
}

const checkMetaMaskConnected = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    return accounts.length > 0;
}

const connectMetaMask = async () => {
    console.log("Request to sync MetaMask...");

    const isWeb3Enabled = checkWeb3Enabled();
    const isMetaMaskConnected = await checkMetaMaskConnected();

    if (!isWeb3Enabled || isMetaMaskConnected) return;
    console.log("MetMask installed...");

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

const getWalletStatus = async () => {
    const isWeb3Enabled = checkWeb3Enabled();
    if (!isWeb3Enabled)
        return "disabled";
    const isMetaMaskConnected = await checkMetaMaskConnected();
    if (isMetaMaskConnected)
        return "connected";
    return "enabled";
}

export { checkMetaMaskConnected, checkWeb3Enabled, connectMetaMask, getWalletStatus };