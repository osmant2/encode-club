import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const PROPOSALS = ["Vanilla", "Choco", "Chery"];

async function giveRightToVoteToAddress(
  ballotContract: Ballot,
  address: string,
  name: string
) {
  console.log(`GIVE RIGHT TO VOTE (${name}):`);
  console.log(`- Giving voting rights to vote, to the address: ${address}`);
  const giveRightToVoteTx = await ballotContract.giveRightToVote(address);
  const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait();
  console.log(
    `- The transaction hash is ${giveRightToVoteTxReceipt.transactionHash} included at the block ${giveRightToVoteTxReceipt.blockNumber}\n`
  );
  console.log("-------------------------------------------\n");
}

async function castVote(ballotContract: Ballot, voter: SignerWithAddress) {
  console.log("CAST VOTE (WITH NO VOTING RIGHTS):");
  console.log(`- Normal Voter's address is: ${voter.address}`);
  try {
    console.log(`- Normal Voter voting for proposal '${PROPOSALS[0]}'\n`);
    await ballotContract.connect(voter).vote(0);
  } catch (error) {
    console.log("- Reverted with reason 'Has no right to vote'");
    const voterHasVoted = await ballotContract.voters(voter.address);
    console.log(
      `- Normal Voter ${voter.address} has voted: ${voterHasVoted.voted}`
    );
    console.log("-------------------------------------------\n");
  } finally {
    await giveRightToVoteToAddress(
      ballotContract,
      voter.address,
      "Normal Voter"
    );
    console.log(`- Normal Voter voting for proposal '${PROPOSALS[0]}'\n`);
    const voteTx = await ballotContract.connect(voter).vote(0);
    const voteTxRec = await voteTx.wait();
    const voterHasVoted = await ballotContract.voters(voter.address);
    console.log(
      `- Normal Voter ${voter.address} has voted: ${voterHasVoted.voted}`
    );
    console.log(
      `- The transaction hash is ${voteTxRec.transactionHash} included at the block ${voteTxRec.blockNumber}\n`
    );
    console.log("-------------------------------------------\n");
  }
}

async function delegateToAddress(
  ballotContract: Ballot,
  sickVoter: SignerWithAddress,
  delegateVoter: SignerWithAddress
) {
  console.log("DELEGATING VOTES OF 'SICK VOTER' TO 'DELEGATE VOTER':\n");
  console.log(`- Sick Voter's address is: ${sickVoter.address}`);
  console.log(`- Delegate Voter's address is: ${delegateVoter.address}\n`);

  await giveRightToVoteToAddress(
    ballotContract,
    sickVoter.address,
    "Sick Voter"
  );
  await giveRightToVoteToAddress(
    ballotContract,
    delegateVoter.address,
    "Delegate Voter"
  );

  console.log(`- Delegating Sick Voter's rights to Delegate Voter.`);

  const delTx = await ballotContract
    .connect(sickVoter)
    .delegate(delegateVoter.address);
  const delTxRec = await delTx.wait();

  console.log(`- Delegation successful.`);
  console.log(
    `- The transaction hash is ${delTxRec.transactionHash} included at the block ${delTxRec.blockNumber}\n`
  );

  const voterDelegatedTo = await ballotContract.voters(sickVoter.address);
  console.log(
    `- Sick Voter has delegated to Delegate Voter (${voterDelegatedTo.delegate})`
  );

  const delegatedVoterDelegation = await ballotContract.voters(
    delegateVoter.address
  );
  console.log(
    `- Delegate Voter has ${delegatedVoterDelegation.weight} voting rights\n`
  );

  const voteTx = await ballotContract.connect(delegateVoter).vote(1);
  const voteTxRec = await voteTx.wait();
  console.log(`- Delegate Voter voted for proposal '${PROPOSALS[1]}'`);
  console.log(
    `- The transaction hash is ${voteTxRec.transactionHash} included at the block ${voteTxRec.blockNumber}\n`
  );
  console.log("-------------------------------------------\n");
}

async function queryResults(ballotContract: Ballot) {
  const winner = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName();
  console.log(
    `- The Winner is: ${winner} - ${ethers.utils.parseBytes32String(
      winnerName
    )} (${winnerName})`
  );
}

async function main() {
  const [chairperson, voter, sickVoter, delegateVoter] =
    await ethers.getSigners();
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String)
  );

  await ballotContract.deployed();

  console.log("-------------------------------------------");
  console.log(`- The chairperson is: ${chairperson.address}`);
  console.log(`- Proposals for 'THE BEST ICE-CREAM FLAVOR': ${PROPOSALS}`);
  console.log("-------------------------------------------\n");

  await castVote(ballotContract, voter);
  await delegateToAddress(ballotContract, sickVoter, delegateVoter);
  await queryResults(ballotContract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
