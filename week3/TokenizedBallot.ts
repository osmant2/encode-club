import { ethers } from "hardhat";
import {
  IceCreamToken,
  IceCreamToken__factory,
  TokenizedBallot,
  TokenizedBallot__factory,
} from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const PROPOSALS = ["Choco", "Vanilla", "Cherry"];
const MINT_VALUE = ethers.utils.parseUnits("10");
const TARGET_BLOCK_NUMBER = 1000099;

async function castVote(
  balltoContract: TokenizedBallot,
  account: SignerWithAddress,
  proposal: number,
  amount: number
) {
  const voteTx = await balltoContract.connect(account).vote(proposal, amount);
  const voteTxRec = await voteTx.wait();

  console.log(
    `${account.address} has given ${amount} vote(s) for the proposal number ${proposal} at block number ${voteTxRec.blockNumber}.`
  );
  console.log(`Transaction: ${voteTxRec.transactionHash}`);
}

async function getAccountVotingPower(
  tokenContact: IceCreamToken,
  account: SignerWithAddress
) {
  const votePow = await tokenContact.getVotes(account.address);
  return ethers.utils.formatUnits(votePow);
}

async function delegateVotes(
  tokenContact: IceCreamToken,
  from: SignerWithAddress,
  to: SignerWithAddress
) {
  const delegateTx = await tokenContact.connect(from).delegate(to.address);
  const delegateTxRec = await delegateTx.wait();
  console.log(
    `${from.address} has delegated to ${to.address} at block ${delegateTxRec.blockNumber}`
  );
  console.log(`Transaction: ${delegateTxRec.transactionHash}`);
}

async function queryResults(ballotContract: TokenizedBallot) {
  console.log(`\nLatest Results of the Vote:`);
  for (let i = 0; i < PROPOSALS.length; i++) {
    let proposal = await ballotContract.proposals(i);
    console.log(
      `${ethers.utils.parseBytes32String(
        proposal.name
      )}: ${ethers.utils.formatUnits(proposal.voteCount, "ether")} votes`
    );
  }

  console.log(
    `\nWinning Proposal is: ${ethers.utils.parseBytes32String(
      await ballotContract.winnerName()
    )}`
  );
}

async function main() {
  console.log(`\nProposals for 'THE BEST ICE-CREAM FLAVOR': ${PROPOSALS}\n`);
  const [deployer, acc1, acc2] = await ethers.getSigners();

  const tokenContractFactory = new IceCreamToken__factory(deployer);
  const iceCreamToken = await tokenContractFactory.deploy();
  const tokenDeployTx = await iceCreamToken.deployed();
  console.log(
    `Ice Cream Token deployed at: ${iceCreamToken.address} at block: ${tokenDeployTx.deployTransaction.blockNumber}`
  );

  const balltoContractFactory = new TokenizedBallot__factory(deployer);
  const ballotContract = await balltoContractFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String),
    iceCreamToken.address,
    TARGET_BLOCK_NUMBER
  );
  const ballotDeployTx = await ballotContract.deployed();
  console.log(
    `Tokenized Ballot Contract deployed at: ${ballotContract.address} at block: ${ballotDeployTx.deployTransaction.blockNumber}\n`
  );

  console.log(`Granting Minter Role to Accoun1(${acc1.address})`);
  const minterRole = await iceCreamToken.MINTER_ROLE();
  const grantMinterRole = await iceCreamToken
    .connect(deployer)
    .grantRole(minterRole, acc1.address);
  const grantMinterRoleRec = await grantMinterRole.wait();
  console.log(
    `Minter Role granted to Account1, at block ${grantMinterRoleRec.blockNumber}`
  );

  console.log(
    `Minting ${ethers.utils.formatUnits(MINT_VALUE)} tokens for: ${
      acc1.address
    }`
  );

  const mintTx = await iceCreamToken.mint(acc1.address, MINT_VALUE);
  const mintTxRec = await mintTx.wait();

  console.log(
    `Minted ${ethers.utils.formatUnits(MINT_VALUE)} token for: ${
      acc1.address
    } at block ${mintTxRec.blockNumber}`
  );
  const acc1TokenBalance = await iceCreamToken.balanceOf(acc1.address);
  console.log(
    `Balance at the address ${acc1.address}: ${ethers.utils.formatUnits(
      acc1TokenBalance,
      "ether"
    )}\n`
  );

  console.log(`Showing voting power of ${acc1.address} before delegating:`);
  console.log(
    `Voting power of ${acc1.address}: ${await getAccountVotingPower(
      iceCreamToken,
      acc1
    )}`
  );
  console.log(`${acc1.address} self delegating for voting power.`);
  const delegateTx = await delegateVotes(iceCreamToken, acc1, acc1);

  console.log(`\nShowing voting power of ${acc1.address} after delegating:`);
  console.log(
    `Voting power of ${acc1.address}: ${await getAccountVotingPower(
      iceCreamToken,
      acc1
    )}\n`
  );

  const [_amount, _proposal] = [1, 2];
  const accs = [acc1, acc2];

  console.log(
    `Giving ${_amount} vote(s) for proposal number ${_proposal} as Account1(${acc1.address})`
  );
  await castVote(ballotContract, acc1, _proposal, _amount);

  console.log(`Showing voting power of ${acc1.address} after voting:`);
  console.log(
    `Voting power of ${acc1.address}: ${await getAccountVotingPower(
      iceCreamToken,
      acc1
    )}\n`
  );

  console.log(`Transfering 5 tokens from Accoun1 to Account 2`);
  const transferTx = await iceCreamToken
    .connect(acc1)
    .transfer(acc2.address, ethers.utils.parseUnits("5"));
  const transferTxRec = await transferTx.wait();
  console.log(
    `Transfer from ${acc1.address} to ${acc2.address} completed at block no ${transferTxRec.blockNumber}`
  );
  console.log(`Transaction: ${transferTxRec.transactionHash}\n`);

  console.log(`Voting Powers of Account 1 and Account 2:`);
  for (let i = 0; i < accs.length; i++) {
    console.log(
      "Voting Power of",
      await accs[i].address,
      ":",
      ethers.utils.formatUnits(await iceCreamToken.getVotes(accs[i].address))
    );
  }

  console.log(`\n${acc2.address} self delegating for voting power.`);
  const delegateAcc2Tx = await delegateVotes(iceCreamToken, acc2, acc2);

  console.log(`\nVoting Powers of Account 1 and Account 2:`);
  for (let i = 0; i < accs.length; i++) {
    console.log(
      "Voting Power of",
      await accs[i].address,
      ":",
      ethers.utils.formatUnits(await iceCreamToken.getVotes(accs[i].address))
    );
  }

  const [_amount2, _proposal2] = [4, 0];

  console.log(
    `\nGiving ${_amount2} vote(s) for proposal number ${_proposal2} as Account2(${acc2.address})`
  );
  await castVote(ballotContract, acc2, _proposal2, _amount2);

  await queryResults(ballotContract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
