import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const PROPOSALS = ["Vanilla", "Choco", "Chery"];

/**
 * Gives voting rights to an address by calling the 'giveRightToVote' function of the Ballot contract.
 * @param {Ballot} ballotContract - The deployed Ballot contract instance.
 * @param {string} address - The address to which voting rights are to be given.
 * @param {string} name - The name of the voter, for display purposes.
 * @returns {Promise<void>}
 */
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

/**
 * Casts a vote for the first proposal in the PROPOSALS array, after making sure that the voter has voting rights.
 * @param {Ballot} ballotContract - The deployed instance of the Ballot contract.
 * @param {SignerWithAddress} voter - The Ethereum address of the voter who will cast the vote.
 * @returns {Promise<void>}
 */
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

/**
 * Delegates voting rights of a sick voter to a delegate voter and casts a vote on their behalf.
 *
 * @param {Ballot} ballotContract - The instance of the deployed ballot contract.
 * @param {SignerWithAddress} sickVoter - The address of the sick voter to delegate voting rights from.
 * @param {SignerWithAddress} delegateVoter - The address of the delegate voter to delegate voting rights to.
 * @returns {Promise<void>}
 */
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

/**
 * Queries the winning proposal and prints the winner's name and ID to the console.
 *
 * @param {Ballot} ballotContract - The deployed ballot contract instance.
 *
 * @returns {Promise<void>} A Promise that resolves once the winner is printed to the console.
 */
async function queryResults(ballotContract: Ballot) {
  const winner = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName();
  console.log(
    `- The Winner is: ${winner} - ${ethers.utils.parseBytes32String(
      winnerName
    )} (${winnerName})`
  );
}

/**
 * Deploys the `Ballot` contract, gives voting rights to certain addresses,
 * and performs voting and delegation actions to simulate the voting process.
 * Finally, the function queries the results of the election and logs the winner.
 *
 * @returns {Promise<void>} Promise that resolves when the function completes successfully.
 */
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
