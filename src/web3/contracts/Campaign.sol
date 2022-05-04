// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    struct Request {
        address payable recipient;
        uint256 amount;
        string requestDescription;
        mapping(address => bool) isApproved;
        uint256 approvalCount;
        uint256 targetApprovalCount;
        bool isResolved;
        bool isRevoked;
    }

    uint256 public minimumPay;
    address public owner;
    string public description;
    string public name;
    bool public isLocked = false;
    mapping(address => bool) public isPatron;
    uint256 public patronCount = 0;
    mapping(uint256 => Request) public requests;
    uint256 public requestCount = 0;
    uint256 public openRequestCount = 0;

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized operation.");
        _;
    }

    modifier onlyOpen() {
        require(!isLocked, "Campaign is locked.");
        _;
    }

    modifier onlyValidRequestID(uint256 requestID) {
        require(requestID < requestCount, "Invalid requestID.");
        _;
    }

    modifier onlyUnresolvedRequest(uint256 requestID) {
        Request storage request = requests[requestID];
        require(!request.isResolved, "Request has already been resolved.");
        _;
    }

    modifier onlyUnrevokedRequest(uint256 requestID) {
        Request storage request = requests[requestID];
        require(!request.isRevoked, "Request has already been revoked.");
        _;
    }

    constructor(
        address initOwner,
        string memory initName,
        uint256 initMinimumPay,
        string memory initDes
    ) {
        minimumPay = initMinimumPay;
        name = initName;
        owner = initOwner;
        description = initDes;
    }

    function lockCampaign() external onlyOwner onlyOpen {
        require(
            patronCount > 0,
            "Must have more than 0 patron to lock the campaign."
        );
        isLocked = true;
    }

    function unlockCampaign() external onlyOwner {
        require(openRequestCount == 0, "Open request must be 0");
        require(isLocked, "Campaign is already open");
        isLocked = false;
    }

    function createRequest(
        address payable recipient,
        uint256 amount,
        string memory requestDescription
    ) external onlyOwner {
        require(isLocked, "Open campaign can't issue a new request.");
        require(recipient != address(0), "Recipient can't be 0x0.");
        Request storage newReq = requests[requestCount++];

        newReq.recipient = recipient;
        newReq.amount = amount;
        newReq.requestDescription = requestDescription;
        newReq.targetApprovalCount = (patronCount / 2) + 1;
        newReq.isResolved = false;

        openRequestCount += 1;
    }

    function resolveRequest(uint256 requestID)
        external
        onlyOwner
        onlyValidRequestID(requestID)
        onlyUnresolvedRequest(requestID)
        onlyUnrevokedRequest(requestID)
    {
        Request storage request = requests[requestID];

        require(
            request.approvalCount >= request.targetApprovalCount,
            "Request hasn't been fully approved yet"
        );

        request.isResolved = true;
        request.recipient.transfer(request.amount);
        openRequestCount -= 1;
    }

    function revokeRequest(uint256 requestID)
        external
        onlyOwner
        onlyValidRequestID(requestID)
        onlyUnresolvedRequest(requestID)
        onlyUnrevokedRequest(requestID)
    {
        Request storage request = requests[requestID];
        request.isRevoked = true;
        openRequestCount -= 1;
    }

    function contribute() external payable onlyOpen {
        require(
            msg.value >= minimumPay,
            "Minimum required contribution not meet."
        );
        isPatron[msg.sender] = true;
        patronCount += 1;
    }

    function approveRequest(uint256 requestID)
        external
        onlyValidRequestID(requestID)
        onlyUnresolvedRequest(requestID)
        onlyUnrevokedRequest(requestID)
    {
        require(isPatron[msg.sender], "Not a patron.");

        Request storage request = requests[requestID];

        if (!request.isApproved[msg.sender]) {
            request.approvalCount += 1;
        }
        request.isApproved[msg.sender] = true;
    }
}
