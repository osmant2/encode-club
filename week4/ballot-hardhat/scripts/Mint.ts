import { ethers } from "ethers";
import { IceCreamToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const MINT_VALUE = ethers.utils.parseUnits("10");
const TOKEN_ADDRESS = String(process.env.TOKEN_ADDRESS);

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);

  const contractFactory = new IceCreamToken__factory(signer);
  const contract = contractFactory.attach(TOKEN_ADDRESS);
  console.log(`Attached to the contract at address ${contract.address}`);

  const mintTx = await contract.mint(wallet.address, MINT_VALUE);
  const mintTxRec = await mintTx.wait();

  console.log(
    `The transaction hash is ${mintTxRec.transactionHash} included in the block ${mintTxRec.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
