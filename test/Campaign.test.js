const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const campaignManagerCompiled = require("../src/web3/build/CampaignManager.build.json");
const campaignCompiled = require("../src/web3/build/Campaign.build.json");


let accounts;
let manager;
let campaignAddresses;
let campaigns;

const name = "Test";
const minimumPay = 100;
const offset = 100000000;
const description = "Testing the contract";

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    manager = await new web3.eth.Contract(campaignManagerCompiled["abi"])
        .deploy({ data: campaignManagerCompiled["bytecode"] })
        .send({ from: accounts[0], gas: "10000000" });

    await manager.methods.deploy(name, minimumPay, description).send({
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

        const minPayFromContract = await campaigns[0].methods.minimumPay().call();
        assert.equal(minPayFromContract, minimumPay);

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

        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        const patronCount = await campaigns[0].methods.patronCount().call();
        assert.equal(patronCount, 1, "Patron count is not update.");
        const isPatron = await campaigns[0].methods.isPatron(accounts[1]).call();
        assert.ok(isPatron, true, "Contributor is not marked as a patron.");
    });

    it("User recontribute doesn't change the patron count.", async() => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        const patronCount = await campaigns[0].methods.patronCount().call();
        assert.equal(patronCount, 1, "People recontribute change patron count.");
    });

    it("User can't make a contribution with an amount less than the minimum requirement.", async () => {
        try {
            await campaigns[0].methods.contribute().send({
                from: accounts[1],
                value: minimumPay - 1
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Users can still make a contribution when the amount is less than the minimum requirement.");
        }
    });

    it("Owner can lock the campaign when there is more than 1 patron", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });

        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        const afterIsLock = await campaigns[0].methods.isLocked().call();
        assert.equal(afterIsLock, true, "The campaign can't be locked.");
    });
    
    it("Users can't make a contribution when the contract is locked", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });

        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });

        try {
            await campaigns[0].methods.contribute().send({
                from: accounts[1],
                value: minimumPay + offset
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Users can still make a contribution when the contract is locked.");
        }
    });

    it("Users can make a contribution when the contract is reopen.", async() => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });

        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });

        await campaigns[0].methods.unlockCampaign().send({
            from: accounts[0]
        });

        await campaigns[0].methods.contribute().send({
            from: accounts[4],
            value: minimumPay + offset
        });
        const patronCount = await campaigns[0].methods.patronCount().call();
        assert.equal(patronCount, 2, "Patron count is not update.");
        const isPatron = await campaigns[0].methods.isPatron(accounts[4]).call();
        assert.ok(isPatron, true, "Contributor is not marked as a patron.");
    });
});

describe("Owenr can make requests.", async () => {
    it("Owner can make a request when the campaign is locked.", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });

        await campaigns[0].methods.contribute().send({
            from: accounts[2],
            value: minimumPay + offset
        });

        await campaigns[0].methods.contribute().send({
            from: accounts[3],
            value: minimumPay + offset
        });

        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });

        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });

        const requestCount = await campaigns[0].methods.requestCount().call();
        assert.equal(requestCount, 1, "Request count is not updated.");

        const openRequestCount = await campaigns[0].methods.openRequestCount().call();
        assert.equal(openRequestCount, 1, "Open request count is not updated.");

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["recipient"], accounts[4], "Request recipient is incorrect.");
        assert.equal(request["amount"], minimumPay+1, "Request amount is incorrect.");
        assert.equal(request["requestDescription"], "Test", "Request description is incorrect.");
        assert.equal(request["approvalCount"], 0, "Approval count is not initialized to 0.");
        assert.equal(request["targetApprovalCount"], 2, "Target approval count is not initialized to more than half of the current patrons.");
        assert.ok(!request["isResolve"], "Request is already resolved.");
        assert.ok(!request["isRevoke"], "Request is already revoked.");
    });

    it("Owner can't make a request when the campaign is open.", async () => {
        try {
            await campaigns[0].methods.createRequest(accounts[2], minimumPay+1, "Test").send({
                from: accounts[0]
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can still make a request when the campaign is open.");
        }
    });

    it("Only owenr can make a request.", async () => {
        try {
            await campaigns[0].methods.createRequest(accounts[2], minimumPay+1, "Test").send({
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
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[2], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.approveRequest(0).send({
                from: accounts[3],
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Other user can approve the requests too.");
        }
        await campaigns[0].methods.approveRequest(0).send({
                from: accounts[1],
        });
        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request["approvalCount"], 1, "Approval count is not updated.");
        const isUserApproved = await campaigns[0].methods.isUserApproved(0, accounts[1]).call();
        assert.ok(isUserApproved, "User is not marked as approved.");
    });

    it("Patron can't approve an invalid indexed request", async() => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[2], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });

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

describe("Owner can resolve/revoke requests.", () => {
    it("Only owner can resolve an approved request.", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.contribute().send({
            from: accounts[2],
            value: minimumPay + offset
        });
        await campaigns[0].methods.contribute().send({
            from: accounts[3],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });

        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from : accounts[0],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            // 0/3 approved
            assert.ok(err, "Owner can resolve an unapproved request.");
        }

        await campaigns[0].methods.approveRequest(0).send({
                from: accounts[1],
                gas: "1000000"
        });
        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from : accounts[0],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            // 1/3 approved
            assert.ok(err, "Owner can resolve an unapproved request.");
        }

        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from : accounts[1],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User (Non-owner) can resolve an approved request.");
        }

        await campaigns[0].methods.approveRequest(0).send({
            from: accounts[2],
        });
        const recipientBeforeBalance = await web3.eth.getBalance(accounts[4]);
        await campaigns[0].methods.resolveRequest(0).send({
            from: accounts[0],
        });

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request.isResolved, true, "Approved request can't be resolved.");
        assert.equal(request.isRevoked, false, "Resolved request is also revoked.");
        
        const recipientAfterBalance = await web3.eth.getBalance(accounts[4]);
        assert.ok(recipientAfterBalance > recipientBeforeBalance, "Request amount is not sent.");

        const openRequestCount = await campaigns[0].methods.openRequestCount().call();
        assert(openRequestCount, 0, "Open request count is not updated.");
    });

    it("Owner can revoke a request", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.revokeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });

        const request = await campaigns[0].methods.requests(0).call();
        assert.equal(request.isRevoked, true, "Request can't be revoked.");
        assert.equal(request.isResolved, false, "Revoked request is also resolved.");

        const campaignBalance = await web3.eth.getBalance(campaignAddresses[0]);
        assert.ok(campaignBalance == minimumPay + offset, "Request amount is still sent");

        const openRequestCount = await campaigns[0].methods.openRequestCount().call();
        assert(openRequestCount, 0, "Open request count is not updated.");
    });

    it("Owner can't resolve a closed request", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.approveRequest(0).send({
            from: accounts[1],
            gas: "1000000"
        });
        await campaigns[0].methods.revokeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from: accounts[0],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can resolve a closed request.");
        }
    });

    it("Owner can't revoke a closed request", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.approveRequest(0).send({
            from: accounts[1],
            gas: "1000000"
        });
        await campaigns[0].methods.resolveRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.revokeRequest(0).send({
                from: accounts[0],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can revoke a closed request.");
        }
    });

    it("User can't revoke or resolve a request", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.approveRequest(0).send({
            from: accounts[1],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.revokeRequest(0).send({
                from: accounts[1],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can revoke a request.");
        }
        try {
            await campaigns[0].methods.resolveRequest(0).send({
                from: accounts[1],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can resolve a request.");
        }
    });

    it("User can't approve a closed request.", async() => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.revokeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.approveRequest(0).send({
                from: accounts[1],
                gas: "1000000"
            });
            throw false;
        } catch (err) {
            assert.ok(err, "User can approve a closed request");
        }
    });

    it("Owner can only unlock the campaign when there is no open request.", async () => {
        await campaigns[0].methods.contribute().send({
            from: accounts[1],
            value: minimumPay + offset
        });
        await campaigns[0].methods.lockCampaign().send({
            from: accounts[0]
        });
        await campaigns[0].methods.createRequest(accounts[4], minimumPay+1, "Test").send({
            from: accounts[0],
            gas: "1000000"
        });
        try {
            await campaigns[0].methods.unlockCampaign(0).send({
                from: accounts[1],
            });
            throw false;
        } catch (err) {
            assert.ok(err, "Owner can still unlock the campaign when there are still open requests.");
        }
        await campaigns[0].methods.revokeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });
        await campaigns[0].methods.unlockCampaign().send({
            from: accounts[0]
        });

        const isLocked = await campaigns[0].methods.isLocked().call();

        assert.ok(!isLocked, "Campaign can't be unlocked when there is no open request.");
    });
});


after(done => {
  web3.currentProvider.disconnect();
  done();
});