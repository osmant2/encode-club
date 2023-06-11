import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { CreateVehicleDto } from './vehicles.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class VehiclesService {
  constructor(private readonly contract: Contract) {}

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<void> {
    const { licensePlate } = createVehicleDto;
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);

    // Create a transaction and send it using the signer
    await this.contract.connect(signer).createVehicle(licensePlate);
  }

  async getVehicle(ownerAddress: string): Promise<string> {
    return this.contract.getVehicle(ownerAddress);
  }

  async updateLicensePlate(
    ownerAddress: string,
    licensePlate: string,
  ): Promise<void> {
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider); // Get the signer from the contract

    // Create a transaction and send it using the signer
    await this.contract.connect(signer).updateLicensePlate(licensePlate);
  }

  async getAllVehicles(): Promise<string> {
    const key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(this.contract.provider);

    return await this.contract.connect(signer).listVehicles();
  }
}
