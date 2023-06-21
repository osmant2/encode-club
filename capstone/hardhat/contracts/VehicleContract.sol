// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "./InsurancePolicyContract.sol";

contract VehicleContract {
    struct VehicleInfo {
        address vehicleOwnerAddress;
        string vehicledata;
        string licensePlate;
        uint256 policyId;
    }

    mapping(uint256 => VehicleInfo) private vehicles;
    address[] private vehicleAddresses;
    InsurancePolicyContract private insurancePolicyContract; // Add a reference to the InsurancePolicyContract
    uint256 vehicleCount;

    event VehicleCreated(address indexed owner, string licensePlate, string vehicledata);

    constructor(address _insurancePolicyContractAddress) {
        insurancePolicyContract = InsurancePolicyContract(
            _insurancePolicyContractAddress
        );
        vehicleCount = 1;
    }

    function createVehicle(string memory _licensePlate, uint256 policyId, string memory vehicledata) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(insurancePolicyContract.policyExists(policyId), "Policy doesn't exist");
        
        vehicles[vehicleCount]= VehicleInfo(
            msg.sender, 
            vehicledata, 
            _licensePlate, 
            policyId);
        vehicleCount++;
        vehicleAddresses.push(msg.sender);

        emit VehicleCreated(msg.sender, _licensePlate, vehicledata);
    }

    function getVehicle(uint256 index) public view returns (string memory) {
        return vehicles[index].licensePlate;
    }

    function checkVehicle(uint256 index, uint256 policyId) public view returns (bool) {
        return vehicles[index].policyId == policyId;
    }

    function updateLicensePlate(uint256 index, string memory _licensePlate) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(vehicleExists(index), "Vehicle does not exist");

        vehicles[index].licensePlate = _licensePlate;
    }

    // function vehicleExists(address _vehicleownerAddress, string memory _licensePlate) public view returns (bool) {
    //     return (keccak256(abi.encodePacked(vehicles[_vehicleownerAddress].licensePlate)) == keccak256(abi.encodePacked(_licensePlate)));
    // }

    function vehicleExists(uint256 index) public view returns (bool) {
        return bytes(vehicles[index].licensePlate).length > 0;
    }

    function getAllVehicles() public view returns (VehicleInfo[] memory) {
        uint nftCount = vehicleCount;
        VehicleInfo[] memory lists = new VehicleInfo[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            VehicleInfo storage currentItem = vehicles[currentId];
            lists[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return lists;
    }


        //Returns all the vehicles of a policy
    function getMyVehicles() public view returns (VehicleInfo[] memory) {
        uint totalItemCount =  vehicleCount;
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(vehicles[i+1].vehicleOwnerAddress == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        VehicleInfo[] memory items = new VehicleInfo[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(vehicles[i+1].vehicleOwnerAddress == msg.sender) {
                currentId = i+1;
                VehicleInfo storage currentItem = vehicles[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    
    //Returns all the vehicles of a policy
    function getPolicyVehicles(uint256 _policyId) public view returns (VehicleInfo[] memory) {
        uint totalItemCount =  vehicleCount;
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(vehicles[i+1].policyId == _policyId){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        VehicleInfo[] memory items = new VehicleInfo[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(vehicles[i+1].policyId == _policyId) {
                currentId = i+1;
                VehicleInfo storage currentItem = vehicles[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}