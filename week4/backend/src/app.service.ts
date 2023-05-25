import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from 'ethers';
import * as tokenJson from './assets/IceCreamToken.json';
import * as ballotJson from './assets/TokenizedBallot.json';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  tokenContract: Contract;
  ballotContract: Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ALCHEMY_API_KEY');
    this.provider = new ethers.providers.AlchemyProvider('maticmum', apiKey);
    this.tokenContract = new Contract(
      this.getTokenAddress(),
      tokenJson.abi,
      this.provider,
    );
    this.ballotContract = new Contract(
      this.getBallotAddress(),
      ballotJson.abi,
      this.provider,
    );
  }

  async getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock('latest');
  }

  getTokenAddress(): string {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  getBallotAddress(): string {
    return this.configService.get<string>('BALLOT_ADDRESS');
  }

  async getTotalSupply() {
    return this.tokenContract.totalSupply();
  }

  async getBalanceOf(address: string) {
    const balance = await this.tokenContract.balanceOf(address);
    return ethers.utils.formatUnits(balance);
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await tx.wait();
    return receipt;
  }

  async getReceipt(tx: ethers.providers.TransactionResponse) {
    return await tx.wait();
  }

  async getVotingPower(address: string) {
    const votingPower = await this.tokenContract.getVotes(address);
    return ethers.utils.formatUnits(votingPower);
  }

  async requestTokens(address: string, signature: string) {
    const key = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.provider);
    return this.tokenContract
      .connect(signer)
      .mint(address, ethers.utils.parseUnits('10'));
  }

  async selfDelegate() {
    const key = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.provider);
    return this.tokenContract.connect(signer).delegate(wallet.address);
  }

  async delegateTokens(from: string, to: string) {
    const key = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.provider);
    return this.tokenContract.connect(signer).delegate(to);
  }

  async castVote(proposal: number, amount: string) {
    const key = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.provider);
    return this.ballotContract
      .connect(signer)
      .vote(proposal, ethers.utils.parseUnits(amount));
  }

  async transferTokens(from: string, to: string, amount: string) {
    const key = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.provider);
    return this.tokenContract
      .connect(signer)
      .transfer(to, ethers.utils.parseUnits(amount));
  }

  async getResults() {
    const response = ethers.utils.parseBytes32String(
      await this.ballotContract.winnerName(),
    );

    return JSON.stringify(response);
  }
}
