import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDTO } from './dtos/requestToken.dto';
import { DelegateTokensDTO } from './dtos/delegateTokens.dto';
import { CastVotesDTO } from './dtos/castVote.dto';
import { TransferTokensDTO } from './dtos/transferTokens.dto';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('last-block')
  async getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get('contract-address')
  getAddress() {
    return this.appService.getTokenAddress();
  }

  @Get('total-supply')
  async getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get('transaction-receipt/')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  @Get('balance/:address')
  async getBalance(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get('voting-power/:address')
  async getVotingPower(@Param('address') address: string) {
    return this.appService.getVotingPower(address);
  }

  @Get('self-delegate')
  async selfDelegate() {
    return this.appService.selfDelegate();
  }

  @Post('request-tokens')
  async requestTokens(@Body() body: RequestTokensDTO) {
    return this.appService.requestTokens(body.address, body.signature);
  }

  @Post('delegate-tokens')
  async delegateTokens(@Body() body: DelegateTokensDTO) {
    return this.appService.delegateTokens(body.from, body.to);
  }

  @Post('cast-vote')
  async castVote(@Body() body: CastVotesDTO) {
    return this.appService.castVote(body.proposal, body.amount);
  }

  @Post('transfer')
  async transferTokens(@Body() body: TransferTokensDTO) {
    return this.appService.transferTokens(body.from, body.to, body.amount);
  }

  @Get('results')
  async getResults() {
    return this.appService.getResults();
  }
}
