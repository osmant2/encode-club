# Encode Club – Solidity Bootcamp, April Cohort 1, Week 3 Homework Report:

## Tasks:

- Form groups of 3 to 5 students
- Complete the contracts together
- Develop and run scripts for “TokenizedBallot.sol” within your group to give voting tokens, delegating voting power, casting votes, checking vote power and querying results
- Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
- Share your code in a github repo in the submission form

## Group 6:

* Osman Tataroglu (ozza#3211)
* Ahmad Abtahi (Ahmad_Ara#6226)
* Rehmet Yeshanew (reh#1909)
* Vikram Barandwal (PowersOfTau#0879)
* Ibraheem Arafat (Arofahdev#0716)
* Kasahun Habtamu (CheckTheKing#8812)

## Deployment and process:
Script implemented in local environment for homework. Deployment and other interactions on a public testnet, left for members' to study individually at their convenient times.

A scenario is created for demonstrating for the "TokenizedBallot.sol" smart contract's functions with "IceCreamToken.sol", which are:

- Deploying TokenizedBallot contract and IceCreamToken which is an ERC20 token
- Granting minter role for Account 1 and minting IceCreamTokens
- Showing voting power of Account 1 before self delegation
- Self delegation of Accoun 1 for having voting power
- Showing voting power of Account 1 after self delegation
- Casting vote for Account 1
- Transfering tokens from Account 1 to Account 2
- Showing voting power for both accounts
- Self delegation of Account 2 for having voting power
- Showing updated voting power for both accounts after self delegation of Account 2 
- Casting vote for Account 2
- Showing the proposal voting counts
- Showing the winning proposal

---
### Showing general information and deploying smart contracts:
```typescript
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
```

<img width="1034" alt="Screenshot 2023-05-15 at 22 48 36" src="https://github.com/osmant2/encode-club/assets/131707943/75220c08-e167-44a9-b7e0-0df657bb82b4">

### Granting miner role for Account 1 and minting IceCreamTokens:
```typescript
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
```
<img width="1034" alt="Screenshot 2023-05-15 at 22 52 03" src="https://github.com/osmant2/encode-club/assets/131707943/c48ed6d6-0d34-4dce-9101-b3b53ad7630b">

### Showing voting power of Account 1 before self delegation, self delegation of Account 1 and showing voting power after self delegation:
```typescript
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
```

```typescript
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
```

<img width="1156" alt="Screenshot 2023-05-15 at 22 54 10" src="https://github.com/osmant2/encode-club/assets/131707943/fd9a380d-3e93-4cec-9e6d-e96ce21e00b0">

### Casting vote for Account 1:
```typescript
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
```

```typescript
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
```
<img width="1156" alt="Screenshot 2023-05-15 at 22 56 14" src="https://github.com/osmant2/encode-club/assets/131707943/3f5b6812-b2a1-4efd-97b2-66f3e99740cb">

### Transferring IceCreamTokens from Account 1 to Account 2 and self delegation of Account 2:
```typescript
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
```

<img width="1282" alt="Screenshot 2023-05-15 at 22 59 39" src="https://github.com/osmant2/encode-club/assets/131707943/0c7a9128-e76b-456d-8d7a-4a56298d96cd">

### Casting votes for Account 2:
```typescript
  const [_amount2, _proposal2] = [4, 0];

  console.log(
    `\nGiving ${_amount2} vote(s) for proposal number ${_proposal2} as Account2(${acc2.address})`
  );
  await castVote(ballotContract, acc2, _proposal2, _amount2);
```
<img width="1282" alt="Screenshot 2023-05-15 at 23 01 14" src="https://github.com/osmant2/encode-club/assets/131707943/77d82e8b-fa4f-4666-b66c-cf6e2029b91a">

### Showing the votes for proposals and final result:
```typescript
await queryResults(ballotContract);
```

```typescript
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
```

<img width="1070" alt="Screenshot 2023-05-15 at 23 02 43" src="https://github.com/osmant2/encode-club/assets/131707943/1b461c7c-4600-4ec6-87ba-7766823d5177">

---
## Whole Output:

<img width="1034" alt="Screenshot 2023-05-15 at 19 46 27" src="https://github.com/osmant2/encode-club/assets/131707943/395fc23f-b947-4b91-8e28-38e6f9101538">
