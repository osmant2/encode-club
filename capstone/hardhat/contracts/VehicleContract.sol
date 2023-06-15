// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "./InsurancePolicyContract.sol";

contract VehicleContract {
    struct VehicleInfo {
        address vehicleAddress;
        string model;
        string licensePlate;
        uint256 policyId;
    }

    mapping(address => VehicleInfo) private vehicles;
    address[] private vehicleAddresses;
    InsurancePolicyContract private insurancePolicyContract; // Add a reference to the InsurancePolicyContract
    
    event VehicleCreated(address indexed owner, string licensePlate, string model);

    constructor(address _insurancePolicyContractAddress) {
        insurancePolicyContract = InsurancePolicyContract(
            _insurancePolicyContractAddress
        );
    }

    function createVehicle(string memory _licensePlate, uint256 policyId, string memory model) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(insurancePolicyContract.policyExists(policyId), "Policy doesn't exist");
        
        vehicles[msg.sender] = VehicleInfo(
            msg.sender, 
            model, 
            _licensePlate, 
            policyId);
        vehicleAddresses.push(msg.sender);
        emit VehicleCreated(msg.sender, _licensePlate, model);
    }

    function getVehicle() public view returns (string memory) {
        return vehicles[msg.sender].licensePlate;
    }

    function checkVehicle(address policyholder, uint256 policyId) public view returns (bool) {
        return vehicles[policyholder].policyId == policyId;
    }

    function updateLicensePlate(string memory _licensePlate) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(vehicleExists(msg.sender), "Vehicle does not exist");

        vehicles[msg.sender].licensePlate = _licensePlate;
    }

    // function vehicleExists(address _vehicleownerAddress, string memory _licensePlate) public view returns (bool) {
    //     return (keccak256(abi.encodePacked(vehicles[_vehicleownerAddress].licensePlate)) == keccak256(abi.encodePacked(_licensePlate)));
    // }

    function vehicleExists(address _owner) public view returns (bool) {
        return bytes(vehicles[_owner].licensePlate).length > 0;
    }

    function listVehicles() public view returns (VehicleInfo[] memory) {
        VehicleInfo[] memory vehicleInfos = new VehicleInfo[](
            vehicleAddresses.length
        );
        for (uint256 i = 0; i < vehicleAddresses.length; i++) {
            address vehicleAddress = vehicleAddresses[i];
            string memory model = vehicles[vehicleAddress].model;
            string memory licensePlate = vehicles[vehicleAddress].licensePlate;
            uint256 policyId = vehicles[vehicleAddress].policyId;
            vehicleInfos[i] = VehicleInfo(vehicleAddress, model, licensePlate, policyId);
        }
        return vehicleInfos;
    }
}
