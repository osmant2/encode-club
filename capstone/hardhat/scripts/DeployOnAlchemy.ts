import { ethers } from "hardhat";
import {
  VehicleContract__factory,
  InsurancePolicyContract__factory,
  ClaimContract__factory,
  InsuranceTokenContract__factory,
} from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);

  const insurancePolicyContractFactory = new InsurancePolicyContract__factory(
    signer
  );
  const insurancePolicyContract = await insurancePolicyContractFactory.deploy();
  const insurancePolicyContractTx =
    await insurancePolicyContract.deployTransaction.wait();

  console.log(
    `Insurance Policy Contract is deployed at address ${insurancePolicyContract.address} at block ${insurancePolicyContractTx.blockNumber}`
  );


  const vehicleContractFactory = new VehicleContract__factory(signer);
  const vehicleContract = await vehicleContractFactory.deploy(insurancePolicyContract.address);
  const vehicleContractTx = await vehicleContract.deployTransaction.wait();

  console.log(
    `Vehicle Contract is deployed at address ${vehicleContract.address} at block ${vehicleContractTx.blockNumber}`
  );
  

  const claimContractFactory = new ClaimContract__factory(signer);
  const claimContract = await claimContractFactory.deploy(
    insurancePolicyContract.address,
    vehicleContract.address
  );
  const claimContractTx = await claimContract.deployTransaction.wait();

  console.log(
    `Claim Contract is deployed at address ${claimContract.address} at block ${claimContractTx.blockNumber}`
  );

  const insuranceTokenContractFactory = new InsuranceTokenContract__factory(
    signer
  );
  const insuranceTokenContract = await insuranceTokenContractFactory.deploy();
  const insuranceTokenContractTx =
    await insuranceTokenContract.deployTransaction.wait();

  console.log(
    `InsuranceToken Contract is deployed at address ${insuranceTokenContract.address} at block ${insuranceTokenContractTx.blockNumber}`
  );
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
