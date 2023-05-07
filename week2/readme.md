# Encode Club – Solidity Bootcamp, April Cohort 1, Week 2 Homework Report:

## Tasks:

- Form groups of 3 to 5 students
- Develop and run scripts for “Ballot.sol” within your group to give voting rights, casting votes, delegating votes and querying results
- Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
- Submit your code in a github repository in the form

## Group 6 (in contract ownership order):

* Osman Tataroglu (ozza#3211)
* Ahmad Abtahi (Ahmad_Ara#6226)
* Rehmet Yeshanew (reh#1909)
* Vikram Barandwal (PowersOfTau#0879)
* Ibraheem Arafat (Arofahdev#0716)
* Kasahun Habtamu (CheckTheKing#8812)

## Deployment and process:
Script implemented in local environment for homework. Deployment and other interactions on a public testnet, left for members' to study individually at their convenient times.

A scenario is implemented for demonstrating for "Ballot.sol" smart contract's functions, which are giving voting rights, casting votes, delegating votes and querying results. The scenario works in the following order:

- Getting and displaying general information about the smart contract.
- Trying to give a vote as a Normal Voter without having voting rights.
- Giving a vote after having voting rigths.
- Delegating a Sick Voter's voting right to a Delegate Voter.
- Giving vote for for two person as Delegate Voter.
- Showing the winning proposal.

---
### main function structure and getting and displaying general information about the smart contract:

```typescript
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
```

<img width="1378" alt="Screenshot 2023-05-07 at 16 22 48" src="https://user-images.githubusercontent.com/131707943/236680217-854e1dc3-1537-4c9f-aa5c-59901365064a.png">

### castVote functions and trying to give a vote as a Normal Voter without having voting rights:
```typescript
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
  ...
  ...
```

<img width="1378" alt="Screenshot 2023-05-07 at 16 32 14" src="https://user-images.githubusercontent.com/131707943/236680654-4dd4b2f7-a3bf-4c01-95fb-cbd0d4d68c10.png">

> In this part, Normal Voter tries to vote for 'Vanilla' proposal without having voting rights. As a result of not having voting rights, castVote opeartion is reverted on the blockchain.

### giveRightToVoteToAddress, continuation of the castVote and giving a vote after having voting rigths:
```typescript
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
```

<img width="1378" alt="Screenshot 2023-05-07 at 16 41 13" src="https://user-images.githubusercontent.com/131707943/236681041-e8d2b3e3-ebcd-44f9-82d2-dba5133f923b.png">

```typescript
async function castVote(ballotContract: Ballot, voter: SignerWithAddress)
...
... 
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

```
<img width="1378" alt="Screenshot 2023-05-07 at 16 46 47" src="https://user-images.githubusercontent.com/131707943/236681354-480d97a0-ba11-4bda-bd0e-e6d66e968c59.png">

### delegateToAddress function and delegating a Sick Voter's voting right to a Delegate Voter, then delegated voter's voting:
```typescript
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
```
> Displaying the voters' addresses and giving them voting rights

<img width="1378" alt="Screenshot 2023-05-07 at 16 55 07" src="https://user-images.githubusercontent.com/131707943/236681841-602f439c-0020-45b4-97c5-6bd115ce8985.png">

> Delegating Sick Voter's rights to Delegate Voter

<img width="1378" alt="Screenshot 2023-05-07 at 16 57 37" src="https://user-images.githubusercontent.com/131707943/236681927-cf3641cd-b313-4737-a238-66441223233c.png">

> Delegated voter votes for 'Choco' proposal with delegated rights

<img width="1378" alt="Screenshot 2023-05-07 at 16 58 38" src="https://user-images.githubusercontent.com/131707943/236681974-c874ac10-a992-4a84-afdc-7e40c6bf5722.png">

### queryResults function and displaying the winning proposal:
```typescript
async function queryResults(ballotContract: Ballot) {
  const winner = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName();
  console.log(
    `- The Winner is: ${winner} - ${ethers.utils.parseBytes32String(
      winnerName
    )} (${winnerName})`
  );
}
```

<img width="1378" alt="Screenshot 2023-05-07 at 17 02 19" src="https://user-images.githubusercontent.com/131707943/236682172-7c7b095f-7dec-458f-9005-ea651c4f9c5a.png">

---
## Whole output:
<img width="1002" alt="Screenshot 2023-05-07 at 17 03 36" src="https://user-images.githubusercontent.com/131707943/236682259-fd832ed0-72cf-4324-aaec-fb851391f79c.png">
