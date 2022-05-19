const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const campaignManagerCompiled = require("../web3/build/CampaignManager.build.json");
const campaignCompiled = require("../web3/build/Campaign.build.json");


let accounts;
let manager;
let campaignAddresses;
let campaigns;

const name = "Test";
const minContribution = 100;
const offset = 100;
const description = "Testing the contract";

const makeContribution = async (acctID) => {
    await campaigns[0].methods.contribute().send({
        from: accounts[acctID],
        value: minContribution + offset,
        gas: 1000000
    });    
}

const lockCampaign = async () => {
    await campaigns[0].methods.lockCampaign().send({
        from: accounts[0]
    });
};

const unlockCampaign = async () => {
    await campaigns[0].methods.unlockCampaign().send({
        from: accounts[0]
    });
}

const issueRequest = async (acctID, amount) => {
    await campaigns[0].methods.issueRequest(accounts[acctID], amount, "Test").send({
        from: accounts[0],
        gas: "1000000"
    });
}

const approveRequest = async (acctID) => {
    await campaigns[0].methods.approveRequest(0).send({
        from: accounts[acctID],
        gas: "1000000"
    });
}

const rejectRequest = async (acctID) => {
    await campaigns[0].methods.rejectRequest(0).send({
        from: accounts[acctID],
        gas: "1000000"
    });    
}

const resolveRequest = async (requestID) => {
    await campaigns[0].methods.resolveRequest(requestID).send({
        from: accounts[0],
        gas: "5000000"
    });    
}

const cancelRequest = async (requestID) => {
    await campaigns[0].methods.cancelRequest(requestID).send({
        from: accounts[0],
        gas: "5000000"
    });    
}

const requestStatus = {
    Active: 0,
    Resolved: 1,
    Approved: 2,
    Cancelled: 3,
    Rejected: 4
}


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    manager = await new web3.eth.Contract(campaignManagerCompiled["abi"])
        .deploy({ data: campaignManagerCompiled["bytecode"] })
        .send({ from: accounts[0], gas: "10000000" });

    await manager.methods.deploy(name, minContribution, description).send({
        from: accounts[0],
        gas: "10000000"
    });

    campaignAddresses = await manager.methods.getCampaigns().call();
    campaigns = []
    for (let campaignAddress of campaignAddresses) {
        const campaign = await new web3.eth.Contract(
            campaignCompiled["abi"],
            campaignAddress
        );
        campaigns.push(campaign);
    }
})

describe("Contract is well deployed and constructed.", async () => {
    it("Campaign is deployed.", () => {
        assert.ok(campaigns[0].options.address);
    });

    it("Constructor is called.", async () => {
        const owner = await campaigns[0].methods.owner().call();
        assert.equal(owner, accounts[0]);

        const minConFromContract = await campaigns[0].methods.minContribution().call();
        assert.equal(minConFromContract, minContribution);

        const nameFromContract = await campaigns[0].methods.name().call();
        assert.equal(nameFromContract, name);

        const desFromContract = await campaigns[0].methods.description().call();
        assert.equal(desFromContract, description);
    });
});

describe("Users can make contributions.", async () => {
    it("Users can make a contribution when the contract is open.", async() => {
        const beforeIsLock = await campaigns[0].methods.isLocked().call();
        assert.equal(beforeIsLock, false, "The initial state of {isLocked} is not set to false.");

        await makeContribution(1);

        const patronCount = await campaigns[0].methods.patronCount().call();
        assert.equal(patronCount, 1, "Patron count is not update.");
        const isPatron = await campaigns[0].methods.isPatron(accounts[1]).call();
        assert.ok(isPatron, true, "Contributor is not marked as a patron.");
    });

    it("User can't recontribute.", async() => {
        await makeContribution(1);
        try {
            await makeContribution(1);
            throw false;
        } catch (err) {
            assert.ok(err, "User can recontribute.");
        }
    });

    it("User can't make a contribution with an amount less than the minimum requirement.", async () => {
        try {
            await campaigns[0].methods.contribute().send({
                from: accounts[1],
                value: minContribution - 1
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Users can still make a contribution when the amount is less than the minimum requirement.");
        }
    });

    it("Owner can lock the campaign when there is more than 1 patron", async () => {
        await makeContribution(1);
        await lockCampaign();

        const afterIsLock = await campaigns[0].methods.isLocked().call();

        assert.equal(afterIsLock, true, "The campaign can't be locked.");
    });
    
    it("Users can't make a contribution when the contract is locked", async () => {
        await makeContribution(1);
        await lockCampaign();

        try {
            await makeContribution(1);
            throw false;
        } catch (err) {
            assert.ok(err, "Users can still make a contribution when the contract is locked.");
        }
    });

    it("Users can make a contribution when the contract is reopen.", async() => {
        await makeContribution(1);
        await lockCampaign();
        await unlockCampaign();

        await makeContribution(2);

        const patronCount = await campaigns[0].methods.patronCount().call();
        assert.equal(patronCount, 2, "Patron count is not update.");

        const isPatron = await campaigns[0].methods.isPatron(accounts[2]).call();
        assert.ok(isPatron, true, "Contributor is not marked as a patron.");
    });
});

describe("Owenr can make requests.", async () => {
    it("Owner can make a request when the campaign is locked.", async () => {
        await makeContribution(1);
        await makeContribution(2);
        await makeContribution(3);

        await lockCampaign();

        const aB = await campaigns[0].methods.activeBalance().call();
        await issueRequest(4, minContribution);

        const requestCount = await campaigns[0].methods.requestCount().call();
        assert.equal(requestCount, 1, "Request count is not updated.");

        const activeRequestCount = await campaigns[0].methods.activeRequestCount().call();
        assert.equal(activeRequestCount, 1, "Open request count is not updated.");

        const totalBalance = await web3.eth.getBalance(campaignAddresses[0]);
        const activeBalance = await campaigns[0].methods.activeBalance().call();
        
        assert.equal(totalBalance-minContribution, activeBalance, "Active balance is not update.");

        try {
            await issueRequest(1, activeBalance + 100);
            throw false;
        } catch (err){
            assert.ok(err, "Owner can create request with the amount more than active balance.")
        }
        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["recipient"], accounts[4], "Request recipient is incorrect.");
        assert.equal(request["amount"], minContribution, "Request amount is incorrect.");
        assert.equal(request["requestDescription"], "Test", "Request description is incorrect.");
        assert.equal(request["approvalCount"], 0, "Approval count is not initialized to 0.");
        assert.equal(request["targetApprovalCount"], 2, "Target approval count is not initialized to more than half of the current patrons.");
        assert.equal(request["status"], requestStatus["Active"], "Request status is not active.");
    });

    it("Owner can't make a request when the campaign is open.", async () => {
        try {
            await issueRequest(1, minContribution);
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can still make a request when the campaign is open.");
        }
    });

    it("Only owenr can make a request.", async () => {
        try {
            await campaigns[0].methods.issueRequest(accounts[2], minContribution+1, "Test").send({
                from: accounts[1]
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can make a request.");
        }
    });
});

describe("Users can approve requests.", async () => {
    it("Only patron can approve a request", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(2, minContribution);
        try {
            await approveRequest(2);
            throw false;
        } catch (err) {
            assert.ok(err, "Other user can approve the requests too.");
        }
        await approveRequest(1);

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["approvalCount"], 1, "Approval count is not updated.");
        assert.equal(request["status"], requestStatus["Approved"], "Request Status is not updated.");

        const isUserApproved = await campaigns[0].methods.isUserApproved(0, accounts[1]).call();
        assert.ok(isUserApproved, "User is not marked as approved.");

        try {
            await approveRequest(1);
            throw false;
        } catch (err) {
            assert.ok(err, "User can approve twice or approve an inactive request.");
        }
    });

    it("Patron can't approve an invalid indexed request", async() => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(2, minContribution);

        try {
            await campaigns[0].methods.approveRequest(1).send({
                from: accounts[1],
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Other user can approve an invalid indexed request.");
        }
    });
});

describe("Users can reject requests.", async () => {
    it("Only patron can reject a request", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(2, minContribution);

        try {
            await rejectRequest(2);
            throw false;
        } catch (err) {
            assert.ok(err, "Other user can reject the requests too.");
        }
        await rejectRequest(1);

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["rejectionCount"], 1, "Rejection count is not updated.");
        assert.equal(request["status"], requestStatus["Rejected"], "Request Status is not updated.");

        const isUserRejected = await campaigns[0].methods.isUserRejected(0, accounts[1]).call();
        assert.ok(isUserRejected, "User is not marked as approved.");

        try {
            await rejectRequest(1);
            throw false;
        } catch (err) {
            assert.ok(err, "User can reject twice or reject an inactive request.");
        }
    });

    it("Patron can't reject an invalid indexed request", async() => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(2, minContribution);

        try {
            await campaigns[0].methods.rejectRequest(1).send({
                from: accounts[1],
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Other user can approve an invalid indexed request.");
        }
    });
});


describe("Owner can resolve/cancel requests.", () => {
    it("Only owner can resolve an approved request.", async () => {
        await makeContribution(1);
        await makeContribution(2);
        await makeContribution(3);

        await lockCampaign();

        await issueRequest(4, minContribution);

        try {
            await resolveRequest(0);
            throw false;
        } catch (err) {
            // 0/3 approved
            assert.ok(err, "Owner can resolve an unapproved request.");
        }

        await approveRequest(1);

        try {
            await resolveRequest(0);
            throw false;
        } catch (err) {
            // 1/3 approved
            assert.ok(err, "Owner can resolve an unapproved request.");
        }

        await approveRequest(2);

        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from : accounts[1],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User (Non-owner) can resolve an approved request.");
        }

        const recipientBeforeBalance = await web3.eth.getBalance(accounts[4]);
        await resolveRequest(0);

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["status"], requestStatus["Resolved"], "Request status is not updated.");
        
        const recipientAfterBalance = await web3.eth.getBalance(accounts[4]);
        assert.ok(recipientAfterBalance > recipientBeforeBalance, "Request amount is not sent.");

        const activeRequestCount = await campaigns[0].methods.activeRequestCount().call();
        assert(activeRequestCount, 0, "Active request count is not updated.");
    });

    it("Owner can cancel a request", async () => {
        await makeContribution(1);
        await lockCampaign();

        await issueRequest(2, minContribution);

        await cancelRequest(0);

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["status"], requestStatus["Cancelled"], "Request status is not updated.");

        const campaignBalance = await web3.eth.getBalance(campaignAddresses[0]);
        const campaignActiveBalance = await campaigns[0].methods.activeBalance().call();
        assert.ok(campaignBalance == campaignActiveBalance, "Active balance is not updated.");

        const activeRequestCount = await campaigns[0].methods.activeRequestCount().call();
        assert(activeRequestCount, 0, "Active request count is not updated.");
    });

    it("Owner can't resolve a closed request", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(4, minContribution);
        await approveRequest(1);
        await cancelRequest(0);

        try {
            await resolveRequest(0);
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can resolve a closed request.");
        }
    });

    it("Owner can't cancel a closed request", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(4, minContribution);
        await approveRequest(1);

        await resolveRequest(0);

        try {
            await cancelRequest(0);
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can cancel a closed request.");
        }
    });

    it("User can't cancel or resolve a request", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(4, minContribution);
        await approveRequest(1);

        try {
            await campaigns[0].methods.cancelRequest(0).send({
                from: accounts[1]
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can cancel a request.");
        }
        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from: accounts[1]
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can resolve a request.");
        }
    });

    it("User can't approve a closed request.", async() => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(4, minContribution);

        await cancelRequest(0);

        try {
            await approveRequest(1);
            throw false;
        } catch (err) {
            assert.ok(err, "User can approve a closed request");
        }
    });

    it("Owner can only unlock the campaign when there is no open request.", async () => {
        await makeContribution(1);
        await lockCampaign();
        await issueRequest(4, minContribution);
        
        try {
            await unlockCampaign();
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can still unlock the campaign when there are still open requests.");
        }
        await cancelRequest(0);
        await unlockCampaign();

        const isLocked = await campaigns[0].methods.isLocked().call();

        assert.ok(!isLocked, "Campaign can't be unlocked when there is no open request.");
    });
});

describe("Get Summary of the contract", async () => {
    it("Call to getVarSummary", async () => {
        let sum;
        sum = await campaigns[0].methods.getVarSummary().call();
        assert.ok(sum);
    })
})


after(done => {
  web3.currentProvider.disconnect();
  done();
});