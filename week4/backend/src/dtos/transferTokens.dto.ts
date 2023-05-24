import { ApiProperty } from '@nestjs/swagger';

export class TransferTokensDTO {
  @ApiProperty()
  readonly from: string;
  @ApiProperty()
  readonly to: string;
  @ApiProperty()
  readonly amount: string;
}
