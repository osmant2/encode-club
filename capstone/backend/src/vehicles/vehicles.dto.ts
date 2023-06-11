import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  licensePlate: string;
}

export class UpdateLicensePlateDto {
  @IsNotEmpty()
  @ApiProperty()
  licensePlate: string;
}
