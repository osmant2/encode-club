// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsurancePolicyContract is Ownable {
    enum PolicyStatus {
        Active,
        Inactive
    }

    struct PolicyInfo {
        uint256 policyId;
        address owner;
    }

    struct InsurancePolicy {
        uint256 policyId;
        address owner;
        uint256 premiumAmount;
        PolicyStatus status;
        uint256[] claimIds; // Add claimIds to track associated claims
    }

    mapping(uint256 => InsurancePolicy) private policies;
    uint256 private nextPolicyId;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed owner,
        uint256 premiumAmount
    );
    event PolicyStatusUpdated(uint256 indexed policyId, PolicyStatus status);
    event ClaimAssociated(uint256 indexed policyId, uint256 indexed claimId);

    constructor() {
        transferOwnership(msg.sender);
    }

    function createPolicy(uint256 _premiumAmount) public {
        require(_premiumAmount > 0, "Premium amount must be greater than zero");

        policies[nextPolicyId] = InsurancePolicy(
            nextPolicyId,
            msg.sender,
            _premiumAmount,
            PolicyStatus.Active,
            new uint256[](0) // Initialize an empty array of claimIds
        );
        emit PolicyCreated(nextPolicyId, msg.sender, _premiumAmount);

        nextPolicyId++;
    }

    function getPolicy(
        uint256 _policyId
    )
        public
        view
        returns (
            uint256 policyId,
            address owner,
            uint256 premiumAmount,
            PolicyStatus status,
            uint256[] memory claimIds
        )
    {
        InsurancePolicy storage policy = policies[_policyId];

        return (
            policy.policyId,
            policy.owner,
            policy.premiumAmount,
            policy.status,
            policy.claimIds
        );
    }

    //For Testing Purposes
    function getInsurancePoliciesByOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256[] memory ownedPolicies = new uint256[](nextPolicyId);
        uint256 counter = 0;

        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (policies[i].owner == _owner) {
                ownedPolicies[counter] = policies[i].policyId;
                counter++;
            }
        }

        // Resize the ownedPolicies array to remove unused elements
        assembly {
            mstore(ownedPolicies, counter)
        }

        return ownedPolicies;
    }

    function listInsurancePolicies() public view returns (PolicyInfo[] memory) {
        PolicyInfo[] memory policiesInfo = new PolicyInfo[](nextPolicyId);

        for (uint256 i = 0; i < nextPolicyId; i++) {
            InsurancePolicy storage policy = policies[i];
            policiesInfo[i] = PolicyInfo(policy.policyId, policy.owner);
        }

        return policiesInfo;
    }

    function updatePolicyStatus(
        uint256 _policyId,
        PolicyStatus _status
    ) public onlyOwner {
        InsurancePolicy storage policy = policies[_policyId];
        require(policy.owner != address(0), "Policy does not exist");

        policy.status = _status;
        emit PolicyStatusUpdated(_policyId, _status);
    }

    function associateClaim(uint256 _policyId, uint256 _claimId) public {
        InsurancePolicy storage policy = policies[_policyId];
        require(policy.owner != address(0), "Policy does not exist");

        policy.claimIds.push(_claimId);
        emit ClaimAssociated(_policyId, _claimId);
    }
}
