import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { SubmitClaimDto, UpdateClaimStatusDto } from './claims.dto';

@Injectable()
export class ClaimsService {
  private readonly signer: ethers.Signer;

  constructor(private readonly contract: Contract) {
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    this.signer = wallet.connect(this.contract.provider);
  }

  async submitClaim(submitClaimDto: SubmitClaimDto): Promise<void> {
    const { policyId, description } = submitClaimDto;
    await this.contract.connect(this.signer).submitClaim(policyId, description);
  }

  async getClaim(claimId: number) {
    return this.contract.getClaim(claimId);
  }

  async updateClaimStatus(
    claimId: number,
    updateClaimStatusDto: UpdateClaimStatusDto,
  ): Promise<void> {
    const { status } = updateClaimStatusDto;
    await this.contract.connect(this.signer).updateClaimStatus(claimId, status);
  }

  async listAllClaims(): Promise<string> {
    return await this.contract.connect(this.signer).listAllClaims();
  }
}
