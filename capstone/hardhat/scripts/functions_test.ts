import { ethers } from "hardhat";

async function main() {
  const [deployer, address1] = await ethers.getSigners();

  // Get the deployed contracts
  const VehicleContract = await ethers.getContractFactory("VehicleContract");
  const vehicleContract = await VehicleContract.attach(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const InsurancePolicyContract = await ethers.getContractFactory(
    "InsurancePolicyContract"
  );
  const insurancePolicyContract = await InsurancePolicyContract.attach(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const ClaimContract = await ethers.getContractFactory("ClaimContract");
  const claimContract = await ClaimContract.attach(
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  );

  const InsuranceTokenContract = await ethers.getContractFactory(
    "InsuranceTokenContract"
  );
  const insuranceTokenContract = await InsuranceTokenContract.attach(
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  );

  // Test the contracts here
  // Use vehicleContract, insurancePolicyContract, claimContract, and insuranceTokenContract to interact with the contracts

  // Example: Create a vehicle
  const licensePlate = "ABC123876";
  await vehicleContract.createVehicle(licensePlate);
  const vehicle = await vehicleContract.getVehicle(address1.address);
  console.log("Vehicle:", vehicle);

  // Example: Create an insurance policy
  await insurancePolicyContract.createPolicy(200);
  const policy = await insurancePolicyContract.getPolicy(0);
  console.log("Policy:", policy);

  // Example: Submit a claim
  await claimContract.submitClaim(0, "Accident");
  const claim = await claimContract.getClaim(0);
  console.log("Claim:", claim);

  // Example: Update claim status
  await claimContract.updateClaimStatus(0, 1);
  const updatedClaim = await claimContract.getClaim(0);
  console.log("Updated Claim:", updatedClaim);

  // Example: Transfer tokens from the InsuranceTokenContract
  const balanceBefore = await insuranceTokenContract.balanceOf(
    address1.address
  );
  console.log("address1 Balance Before:", balanceBefore.toString());

  await insuranceTokenContract.transfer(address1.address, 200);
  const balance = await insuranceTokenContract.balanceOf(address1.address);
  console.log("address1 Balance After:", balance.toString());
  console.log(
    "Total Supply:",
    (await insuranceTokenContract.totalSupply()).toString()
  );
}

// Run the testing script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
