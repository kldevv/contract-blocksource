// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    enum RequestStatus {
        Active,
        Resolved,
        Approved,
        Cancelled,
        Rejected
    }

    struct Request {
        address payable recipient;
        uint256 amount;
        string requestDescription;
        mapping(address => bool) isApproved;
        mapping(address => bool) isRejected;
        uint256 approvalCount;
        uint256 rejectionCount;
        uint256 targetApprovalCount;
        RequestStatus status;
    }

    event CampaignCreated(address creator);
    event ContributionMade(address patronAddr);
    event RequestIssued(uint256 requestID);
    event RequestVoted(address patronAddr, uint256 requestID, bool isApproval);
    event RequestResolved(uint256 requestID);
    event RequestCancelled(uint256 requestID);
    event CampaignLocked();
    event CampaignUnlocked();

    uint256 public minContribution;
    address public owner;
    string public description;
    string public name;
    bool public isLocked = false;
    mapping(address => bool) public isPatron;
    uint256 public patronCount = 0;
    mapping(uint256 => Request) public requests;
    uint256 public requestCount = 0;
    uint256 public activeRequestCount = 0;
    uint256 public activeBalance = 0;

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

    modifier onlyActiveRequest(uint256 requestID) {
        Request storage request = requests[requestID];
        require(
            request.status == RequestStatus.Active,
            "Request is not active."
        );
        _;
    }

    constructor(
        address initOwner,
        string memory initName,
        uint256 initMinContribution,
        string memory initDes
    ) {
        minContribution = initMinContribution;
        name = initName;
        owner = initOwner;
        description = initDes;
        emit CampaignCreated(msg.sender);
    }

    function lockCampaign() external onlyOwner onlyOpen {
        require(
            patronCount > 0,
            "Must have more than 0 patron to lock the campaign."
        );
        isLocked = true;
        emit CampaignLocked();
    }

    function unlockCampaign() external onlyOwner {
        require(activeRequestCount == 0, "Active request must be 0.");
        require(isLocked, "Campaign is already open.");
        isLocked = false;
        emit CampaignUnlocked();
    }

    function issueRequest(
        address payable recipient,
        uint256 amount,
        string memory requestDescription
    ) external onlyOwner {
        require(isLocked, "Open campaign can't issue a new request.");
        require(recipient != address(0), "Recipient can't be 0x0.");
        require(amount <= activeBalance, "Insufficient fund.");

        activeBalance -= amount;
        activeRequestCount += 1;

        Request storage newReq = requests[requestCount++];

        newReq.recipient = recipient;
        newReq.amount = amount;
        newReq.requestDescription = requestDescription;
        newReq.targetApprovalCount = (patronCount / 2) + 1;
        newReq.status = RequestStatus.Active;

        emit RequestIssued(requestCount - 1);
    }

    function resolveRequest(uint256 requestID)
        external
        onlyOwner
        onlyValidRequestID(requestID)
    {
        Request storage request = requests[requestID];

        require(
            request.status == RequestStatus.Approved,
            "Request hasn't been fully approved yet"
        );

        request.status = RequestStatus.Resolved;
        request.recipient.transfer(request.amount);
        activeRequestCount -= 1;
        emit RequestResolved(requestID);
    }

    function cancelRequest(uint256 requestID)
        external
        onlyOwner
        onlyValidRequestID(requestID)
    {
        Request storage request = requests[requestID];
        require(
            request.status == RequestStatus.Active ||
                request.status == RequestStatus.Approved,
            "Request can't be cancelled."
        );
        request.status = RequestStatus.Cancelled;
        activeRequestCount -= 1;
        activeBalance += request.amount;
        emit RequestCancelled(requestID);
    }

    function contribute() external payable onlyOpen {
        require(
            msg.value >= minContribution,
            "Minimum required contribution not meet."
        );
        require(!isPatron[msg.sender], "Already a patron.");
        isPatron[msg.sender] = true;
        patronCount += 1;
        activeBalance += msg.value;
        emit ContributionMade(msg.sender);
    }

    function approveRequest(uint256 requestID)
        external
        onlyValidRequestID(requestID)
        onlyActiveRequest(requestID)
    {
        require(isPatron[msg.sender], "Not a patron.");

        Request storage request = requests[requestID];

        require(
            !request.isApproved[msg.sender] && !request.isRejected[msg.sender],
            "Patron already voted."
        );
        request.isApproved[msg.sender] = true;
        if (++request.approvalCount >= request.targetApprovalCount) {
            request.status = RequestStatus.Approved;
        }
        emit RequestVoted(msg.sender, requestID, true);
    }

    function rejectRequest(uint256 requestID)
        external
        onlyValidRequestID(requestID)
        onlyActiveRequest(requestID)
    {
        require(isPatron[msg.sender], "Not a patron.");

        Request storage request = requests[requestID];

        require(
            !request.isApproved[msg.sender] && !request.isRejected[msg.sender],
            "Patron already voted."
        );
        request.isRejected[msg.sender] = true;
        if (++request.rejectionCount >= request.targetApprovalCount) {
            request.status = RequestStatus.Rejected;
            activeBalance += request.amount;
        }
        emit RequestVoted(msg.sender, requestID, false);
    }

    function isUserApproved(uint256 requestID, address user)
        external
        view
        onlyValidRequestID(requestID)
        returns (bool)
    {
        return requests[requestID].isApproved[user];
    }

    function isUserRejected(uint256 requestID, address user)
        external
        view
        onlyValidRequestID(requestID)
        returns (bool)
    {
        return requests[requestID].isRejected[user];
    }

    function getVarSummary()
        external
        view
        returns (
            address,
            address,
            string memory,
            string memory,
            uint256,
            bool,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            address(this),
            owner,
            name,
            description,
            minContribution,
            isLocked,
            activeBalance,
            address(this).balance,
            patronCount,
            activeRequestCount,
            requestCount
        );
    }
}
