// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignManager {
    address[] public campaigns;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deploy(
        string memory initName,
        uint256 initMinimumPay,
        string memory initDes
    ) external {
        Campaign campaign = new Campaign(
            msg.sender,
            initName,
            initMinimumPay,
            initDes
        );
        campaigns.push(address(campaign));
    }

    function getCampaigns() external view returns (address[] memory) {
        return campaigns;
    }
}
