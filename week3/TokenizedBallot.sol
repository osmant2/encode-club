// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/Math.sol";

interface IIceCreamToken {
    function getPastVotes(
        address account,
        uint256 blockNumber
    ) external view returns (uint256);
}

contract TokenizedBallot {
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    IIceCreamToken public tokenContract;
    Proposal[] public proposals;
    uint256 public targetBlockNumber;
    mapping(address => uint256) public votingPowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 _targetBlockNumber
    ) {
        tokenContract = IIceCreamToken(_tokenContract);
        targetBlockNumber = _targetBlockNumber - 1;
        targetBlockNumber = block.number;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 proposal, uint _amount) external {
        require(
            votingPower(msg.sender) >= _amount,
            "Error: trying to vote more than allowed"
        );
        votingPowerSpent[msg.sender] += _amount;
        proposals[proposal].voteCount += _amount;
    }

    function votingPower(address _account) public view returns (uint256) {
        return
            tokenContract.getPastVotes(_account, block.number - 1) -
            votingPowerSpent[_account];
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
