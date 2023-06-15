import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import {
  CreateInsurancePolicyDto,
  UpdatePolicyStatusDto,
  AssociateClaimDto,
} from './insurancePolicies.dto';

@Injectable()
export class InsurancePoliciesService {
  constructor(private readonly contract: Contract) {}

  async createPolicy(
    createInsurancePolicyDto: CreateInsurancePolicyDto,
  ): Promise<void> {
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);
    const { premiumAmount } = createInsurancePolicyDto;

    const tx = await this.contract.connect(signer).createPolicy(premiumAmount);
    await tx.wait();
  }

  async getPolicy(policyId: number) {
    const policy = await this.contract.getPolicy(policyId);
    return {
      policyId: policy[0].toNumber(),
      owner: policy[1],
      premiumAmount: policy[2].toNumber(),
      status: policy[3],
      claimIds: policy[4].map((claimId: any) => claimId.toNumber()),
    };
  }

  async updatePolicyStatus(
    policyId: number,
    updatePolicyStatusDto: UpdatePolicyStatusDto,
  ): Promise<void> {
    const { status } = updatePolicyStatusDto;
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);

    const tx = await this.contract
      .connect(signer)
      .updatePolicyStatus(policyId, status);
    await tx.wait();
  }

  async associateClaim(
    policyId: number,
    associateClaimDto: AssociateClaimDto,
  ): Promise<void> {
    const { claimId } = associateClaimDto;
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);

    const tx = await this.contract
      .connect(signer)
      .associateClaim(policyId, claimId);
    await tx.wait();
  }

  async getAllPolicies(): Promise<string> {
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);
    return await this.contract.connect(signer).listInsurancePolicies();
  }
}
