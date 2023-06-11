import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { SubmitClaimDto, UpdateClaimStatusDto } from './claims.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  async submitClaim(@Body() submitClaimDto: SubmitClaimDto): Promise<void> {
    await this.claimsService.submitClaim(submitClaimDto);
  }

  @Get(':claimId')
  async getClaim(@Param('claimId') claimId: number) {
    return this.claimsService.getClaim(claimId);
  }

  @Patch(':claimId/status')
  async updateClaimStatus(
    @Param('claimId') claimId: number,
    @Body() updateClaimStatusDto: UpdateClaimStatusDto,
  ): Promise<void> {
    await this.claimsService.updateClaimStatus(claimId, updateClaimStatusDto);
  }

  @Get()
  async getAllClaims(): Promise<string> {
    return await this.claimsService.listAllClaims();
  }
}
