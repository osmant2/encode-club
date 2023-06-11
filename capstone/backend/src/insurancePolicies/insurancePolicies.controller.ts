import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { InsurancePoliciesService } from './insurancePolicies.service';
import {
  CreateInsurancePolicyDto,
  UpdatePolicyStatusDto,
  AssociateClaimDto,
} from './insurancePolicies.dto';

@Controller('insurance-policies')
export class InsurancePoliciesController {
  constructor(
    private readonly insurancePoliciesService: InsurancePoliciesService,
  ) {}

  @Post()
  async createPolicy(
    @Body() createInsurancePolicyDto: CreateInsurancePolicyDto,
  ): Promise<void> {
    await this.insurancePoliciesService.createPolicy(createInsurancePolicyDto);
  }

  @Get(':policyId')
  async getPolicy(@Param('policyId') policyId: number) {
    return this.insurancePoliciesService.getPolicy(policyId);
  }

  @Patch(':policyId/status')
  async updatePolicyStatus(
    @Param('policyId') policyId: number,
    @Body() updatePolicyStatusDto: UpdatePolicyStatusDto,
  ): Promise<void> {
    await this.insurancePoliciesService.updatePolicyStatus(
      policyId,
      updatePolicyStatusDto,
    );
  }

  @Post(':policyId/claims')
  async associateClaim(
    @Param('policyId') policyId: number,
    @Body() associateClaimDto: AssociateClaimDto,
  ): Promise<void> {
    await this.insurancePoliciesService.associateClaim(
      policyId,
      associateClaimDto,
    );
  }

  @Get()
  async getAllPolicies(): Promise<string> {
    return await this.insurancePoliciesService.getAllPolicies();
  }
}
