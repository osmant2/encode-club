// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VehicleContract is Ownable {
    struct Vehicle {
        string licensePlate;
    }

    struct VehicleInfo {
        address vehicleAddress;
        string licensePlate;
    }

    mapping(address => Vehicle) private vehicles;
    address[] private vehicleAddresses;

    event VehicleCreated(address indexed owner, string licensePlate);

    function createVehicle(string memory _licensePlate) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(!vehicleExists(msg.sender), "Vehicle already exists");

        vehicles[msg.sender] = Vehicle(_licensePlate);
        vehicleAddresses.push(msg.sender);
        emit VehicleCreated(msg.sender, _licensePlate);
    }

    function getVehicle(address _owner) public view returns (string memory) {
        return vehicles[_owner].licensePlate;
    }

    function updateLicensePlate(string memory _licensePlate) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(vehicleExists(msg.sender), "Vehicle does not exist");

        vehicles[msg.sender].licensePlate = _licensePlate;
    }

    function vehicleExists(address _owner) public view returns (bool) {
        return bytes(vehicles[_owner].licensePlate).length > 0;
    }

    function listVehicles() public view returns (VehicleInfo[] memory) {
        VehicleInfo[] memory vehicleInfos = new VehicleInfo[](
            vehicleAddresses.length
        );
        for (uint256 i = 0; i < vehicleAddresses.length; i++) {
            address vehicleAddress = vehicleAddresses[i];
            string memory licensePlate = vehicles[vehicleAddress].licensePlate;
            vehicleInfos[i] = VehicleInfo(vehicleAddress, licensePlate);
        }
        return vehicleInfos;
    }
}
