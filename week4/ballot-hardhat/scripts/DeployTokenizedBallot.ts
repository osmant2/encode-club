import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PROPOSALS = ["Choco", "Vanilla", "Cherry"];
const TARGET_BLOCK_NUMBER = 10000;

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);

  const contractFactory = new TokenizedBallot__factory(signer);
  const contract = await contractFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String),
    String(process.env.TOKEN_ADDRESS),
    TARGET_BLOCK_NUMBER
  );
  const contractDeployTxRec = await contract.deployTransaction.wait();
  console.log(
    `The Ballot Contract is deployed at address ${contract.address} at block ${contractDeployTxRec.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
