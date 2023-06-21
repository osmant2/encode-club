// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract InsurancePolicyContract is Ownable {
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _newpolicyId;
    Counters.Counter private _newpaymentId;

    enum PolicyStatus {
        Active,
        Inactive
    }

    struct PolicyInfo {
        uint256 policyId;
        address owner;
        uint256 premiumAmount;
        string dataUrl;
        PolicyStatus status;
        bool isRegistered;
        uint256[] claimIds;         
    }

     struct UserPayment {
        uint256 policyId;
        address usersVechice;
        uint256 moneyBalance;
        uint256 timestamp;
        uint256 endtime;
        bool monthlyPaid;        
    }
   
    mapping(uint256 => UserPayment) public payments;
    mapping(uint256 => PolicyInfo) private policies;
    uint256 private nextPolicyId = 1; 

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed owner,
        uint256 premiumAmount
    );
    event PolicyStatusUpdated(uint256 indexed policyId, PolicyStatus status);
    event ClaimAssociated(uint256 indexed policyId, uint256 indexed claimId);
    event PaymenMade(
        uint256 indexed policyId,
        address indexed usersVechice,
        uint256 moneyBalance,
        uint256 timestamp,
        uint256 endTime,
        bool monthlyPaid
    );  

    constructor() {
        //nextPolicyId = 1;
        transferOwnership(msg.sender);
    }

    function createPolicy(uint256 _premiumAmount, string memory _dataUrl) public onlyOwner{
        _newpolicyId.increment();
        require(_premiumAmount > 0, "Premium amount must be greater than zero");
        uint256 newTokenId = _newpolicyId.current();
        policies[newTokenId] = PolicyInfo(
            nextPolicyId,
            msg.sender,
            _premiumAmount,
            _dataUrl,
            PolicyStatus.Active,
            true,
            new uint256[](0) // Initialize an empty array of claimIds
        );
        emit PolicyCreated(newTokenId, msg.sender, _premiumAmount);

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
        PolicyInfo storage policy = policies[_policyId];

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

    //This will return all the NFTs currently listed to be sold on the marketplace
    function listInsurancePolicies() public view returns (PolicyInfo[] memory) {
        uint Count = _newpolicyId.current();
        PolicyInfo[] memory pols = new PolicyInfo[](Count);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0; i<Count; i++)
        {
            currentId = i + 1;
            PolicyInfo storage currentItem = policies[currentId];
            pols[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return pols;
    }

    function policyExists(uint256 _policyId) public view returns (bool) {
        return policies[_policyId].isRegistered;
    }

    function updatePolicyStatus(
        uint256 _policyId,
        PolicyStatus _status
    ) public onlyOwner {
        PolicyInfo storage policy = policies[_policyId];
        require(policy.owner != address(0), "Policy does not exist");

        policy.status = _status;
        emit PolicyStatusUpdated(_policyId, _status);
    }

    function associateClaim(uint256 _policyId, uint256 _claimId) public {
        PolicyInfo storage policy = policies[_policyId];
        require(policy.owner != address(0), "Policy does not exist");

        policy.claimIds.push(_claimId);
        emit ClaimAssociated(_policyId, _claimId);
    }


    // Monthly Payment   
    function updateNextTime(uint index) public returns(string memory){
        if(block.timestamp > payments[index].endtime){
            payments[index].endtime = payments[index].endtime + 30 days;
            return "pay these month payment";
        }
        return "Your payment is not due yet";
    }

    function monthlyPayment(uint256 index, address user, uint256 _policyId) public payable {
        uint256 PayMonthly = policies[_policyId].premiumAmount / 10;
        require(msg.value == PayMonthly, "Amount must be equal to the monthly payment"); 
        
        if(payments[index].endtime != 0){
            require(block.timestamp > payments[index].endtime, "Your monthly payment is not due yet");   
        }
                
        _newpaymentId.increment();
        uint256 newPayId = _newpaymentId.current();
        payments[index].moneyBalance += PayMonthly;
        uint256 finalValue = payments[index].moneyBalance;
        
        require(finalValue <= policies[_policyId].premiumAmount, "you have paid all the yearly premimum plan" );
        uint256 _endTime = block.timestamp + 30 days;

        payments[newPayId] = UserPayment(
            _policyId,
            user,
            finalValue,
            block.timestamp,
            _endTime ,
            true
        );        
        emit PaymenMade(_policyId, user, PayMonthly, block.timestamp, _endTime, true);
        payable(policies[_policyId].owner).transfer(msg.value);
    }

    //Get
    function checkPaymentPeriod(uint256 currentTimestamp) public view returns (bool) {
        //uint256[] memory pay = new uint256[](nextpaymentId);
        uint256 nextpaymentId = _newpaymentId.current();
        for (uint256 i = 0; i < nextpaymentId; i++) {
            if (payments[i].usersVechice == msg.sender) {
                if(payments[i].endtime == currentTimestamp){
                    return true;
                }
            }
        }
        return false;
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function listAllUserPayments() public view returns (UserPayment[] memory) {
        uint Count = _newpolicyId.current();
        UserPayment[] memory pays = new UserPayment[](Count);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0; i<Count; i++)
        {
            currentId = i + 1;
            UserPayment storage currentItem = payments[currentId];
            pays[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return pays;
    }
}