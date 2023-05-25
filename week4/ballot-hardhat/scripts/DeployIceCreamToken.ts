import { ethers } from "ethers";
import { IceCreamToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);

  const contractFactory = new IceCreamToken__factory(signer);
  const contract = await contractFactory.deploy();
  const contractDeployTxRec = await contract.deployTransaction.wait();
  console.log(
    `The Token Contract is deployed at address ${contract.address} at block ${contractDeployTxRec.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
