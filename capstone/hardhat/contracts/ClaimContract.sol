// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./InsurancePolicyContract.sol"; // Import the InsurancePolicyContract

contract ClaimContract is Ownable {
    enum ClaimStatus {
        Submitted,
        Accepted,
        Rejected
    }

    struct Claim {
        uint256 claimId;
        uint256 policyId;
        address claimant;
        string description;
        ClaimStatus status;
    }

    mapping(uint256 => Claim) private claims;
    uint256 private nextClaimId;
    InsurancePolicyContract private insurancePolicyContract; // Add a reference to the InsurancePolicyContract

    event ClaimSubmitted(
        uint256 indexed claimId,
        uint256 indexed policyId,
        address indexed claimant,
        string description
    );
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status);

    constructor(address _insurancePolicyContractAddress) {
        insurancePolicyContract = InsurancePolicyContract(
            _insurancePolicyContractAddress
        );
        transferOwnership(msg.sender);
    }

    function submitClaim(uint256 _policyId, string memory _description) public {
        require(_policyId >= 0, "Invalid policy ID");
        require(bytes(_description).length > 0, "Description cannot be empty");

        insurancePolicyContract.getPolicy(_policyId); // Check if policy exists

        require(owner() == msg.sender, "Only contract owner can submit claims");

        claims[nextClaimId] = Claim(
            nextClaimId,
            _policyId,
            msg.sender,
            _description,
            ClaimStatus.Submitted
        );
        emit ClaimSubmitted(nextClaimId, _policyId, msg.sender, _description);

        insurancePolicyContract.associateClaim(_policyId, nextClaimId); // Associate the claim with the policy

        nextClaimId++;
    }

    function getClaim(
        uint256 _claimId
    )
        public
        view
        returns (
            uint256 policyId,
            address claimant,
            string memory description,
            ClaimStatus status
        )
    {
        Claim storage claim = claims[_claimId];
        require(claim.claimant != address(0), "Claim does not exist");

        return (
            claim.policyId,
            claim.claimant,
            claim.description,
            claim.status
        );
    }

    function updateClaimStatus(
        uint256 _claimId,
        ClaimStatus _status
    ) public onlyOwner {
        Claim storage claim = claims[_claimId];
        require(claim.claimant != address(0), "Claim does not exist");

        claim.status = _status;
        emit ClaimStatusUpdated(_claimId, _status);
    }

    function listAllClaims() public view returns (Claim[] memory) {
        Claim[] memory allClaims = new Claim[](nextClaimId);

        for (uint256 i = 0; i < nextClaimId; i++) {
            allClaims[i] = claims[i];
        }

        return allClaims;
    }
}
