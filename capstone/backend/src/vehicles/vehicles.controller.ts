import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateLicensePlateDto } from './vehicles.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<void> {
    await this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get(':ownerAddress')
  async getVehicle(
    @Param('ownerAddress') ownerAddress: string,
  ): Promise<string> {
    return this.vehiclesService.getVehicle(ownerAddress);
  }

  @Patch(':ownerAddress')
  async updateLicensePlate(
    @Param('ownerAddress') ownerAddress: string,
    @Body() updateLicensePlateDto: UpdateLicensePlateDto,
  ): Promise<void> {
    const { licensePlate } = updateLicensePlateDto;
    await this.vehiclesService.updateLicensePlate(ownerAddress, licensePlate);
  }

  @Get()
  async getAllVehicles(): Promise<string> {
    return await this.vehiclesService.getAllVehicles();
  }
}
