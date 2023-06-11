import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateInsurancePolicyDto {
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  premiumAmount: number;
}

export class UpdatePolicyStatusDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @IsNumber()
  status: number;
}

export class AssociateClaimDto {
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  claimId: number;
}
