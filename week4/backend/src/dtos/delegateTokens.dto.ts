import { ApiProperty } from '@nestjs/swagger';

export class DelegateTokensDTO {
  @ApiProperty()
  readonly from: string;
  @ApiProperty()
  readonly to: string;
}
