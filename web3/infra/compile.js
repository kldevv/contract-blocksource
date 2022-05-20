const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "..", "build");

// Read contract source code
const campaignPath = path.resolve(__dirname, "..", "contracts", "Campaign.sol");
const campaignManagerPath = path.resolve(__dirname, "..", "contracts", "CampaignManager.sol");

const campaignSource = fs.readFileSync(campaignPath, "utf8");
const campaignManagerSource = fs.readFileSync(campaignManagerPath, "utf8");

// Compile
const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
                content: campaignSource
        },
        "CampaignManager.sol": {
            content: campaignManagerSource
        }
    },
    settings: {
        outputSelection: {
            "*": {
            "*": ["*"]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)))["contracts"];

// Output to build
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

for (let contractFileName in output) {
    const contractName = contractFileName.split(".")[0];
    const contract = output[contractFileName][contractName];

    const abi = contract["abi"];
    const bytecode = contract["evm"]["bytecode"]["object"];

    const outputPath = path.resolve(buildPath, contractName + ".build.json");

    fs.outputJsonSync(
        outputPath,
        {
            abi,
            bytecode
        }
    );
}

console.log("Compilation succeed.");
