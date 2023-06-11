import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SubmitClaimDto {
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  policyId: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}

export class UpdateClaimStatusDto {
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  status: number;
}
