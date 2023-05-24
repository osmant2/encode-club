import { ApiProperty } from '@nestjs/swagger';

export class CastVotesDTO {
  @ApiProperty()
  readonly proposal: number;
  @ApiProperty()
  readonly amount: string;
}
