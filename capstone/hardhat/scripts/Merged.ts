import { ethers } from "hardhat";

async function main() {
  const [deployer, address1] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the VehicleContract
  const VehicleContract = await ethers.getContractFactory("VehicleContract");
  const vehicleContract = await VehicleContract.deploy();
  await vehicleContract.deployed();

  console.log("VehicleContract deployed at address:", vehicleContract.address);

  // Deploy the InsurancePolicyContract
  const InsurancePolicyContract = await ethers.getContractFactory(
    "InsurancePolicyContract"
  );
  const insurancePolicyContract = await InsurancePolicyContract.deploy();
  await insurancePolicyContract.deployed();

  console.log(
    "InsurancePolicyContract deployed at address:",
    insurancePolicyContract.address
  );

  // Deploy the ClaimContract
  const ClaimContract = await ethers.getContractFactory("ClaimContract");
  const claimContract = await ClaimContract.deploy(
    insurancePolicyContract.address
  );
  await claimContract.deployed();

  console.log("ClaimContract deployed at address:", claimContract.address);

  // Deploy the InsuranceTokenContract
  const InsuranceTokenContract = await ethers.getContractFactory(
    "InsuranceTokenContract"
  );
  const insuranceTokenContract = await InsuranceTokenContract.deploy();
  await insuranceTokenContract.deployed();

  console.log(
    "InsuranceTokenContract deployed at address:",
    insuranceTokenContract.address
  );

  //Attach

  // Example: Create a vehicle
  const licensePlate = "ABC123876";
  await vehicleContract.createVehicle(licensePlate);
  const vehicle = await vehicleContract.getVehicle(deployer.address);
  console.log("Vehicle:", vehicle);

  //Example: List all vehicles with associated addresses
  const vehicles = await vehicleContract.listVehicles();
  console.log("Vehicles:", vehicles);

  // Example: Create an insurance policy
  await insurancePolicyContract.createPolicy(200);
  const policy = await insurancePolicyContract.getPolicy(0);
  console.log("Policy:", policy);

  //Example: List all insurance policies with associated addresses
  const policies = await insurancePolicyContract.listInsurancePolicies();
  console.log("Policies:", policies);

  // Example: Submit a claim
  await claimContract.submitClaim(0, "Accident");
  const claim = await claimContract.getClaim(0);
  console.log("Claim:", claim);

  // Example: Update claim status
  await claimContract.updateClaimStatus(0, 1);
  const updatedClaim = await claimContract.getClaim(0);
  console.log("Updated Claim:", updatedClaim);

  //Example: List all claims
  const allClaims = await claimContract.listAllClaims();
  console.log("All Claims:", allClaims);

  // Example: Transfer tokens from the InsuranceTokenContract
  const balanceBefore = await insuranceTokenContract.balanceOf(
    deployer.address
  );
  console.log("deployer Balance Before:", balanceBefore.toString());

  await insuranceTokenContract.transfer(deployer.address, 200);
  const balance = await insuranceTokenContract.balanceOf(deployer.address);
  console.log("deployer Balance After:", balance.toString());
  console.log(
    "Total Supply:",
    (await insuranceTokenContract.totalSupply()).toString()
  );
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
