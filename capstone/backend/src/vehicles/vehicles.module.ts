import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Contract, ethers } from 'ethers';
import * as dotenv from 'dotenv';

import * as VehicleContractABI from '../assets/VehicleContract.json';

dotenv.config();

@Module({
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: Contract,
      useFactory: async () => {
        // Connect to the Ethereum network using Alchemy provider
        const provider = new ethers.providers.AlchemyProvider(
          'maticmum', // Replace with the desired network (e.g., 'rinkeby', 'ropsten', etc.)
          process.env.ALCHEMY_API_KEY, // Fetch the Alchemy API key from the .env file
        );

        // Get the contract ABI from a JSON file
        const contractABI = VehicleContractABI.abi;

        // Fetch the contract address from the .env file
        const contractAddress = process.env.VEHICLE_CONTRACT;

        // Create the contract instance
        const contract = new Contract(contractAddress, contractABI, provider);

        // Return the contract instance
        return contract;
      },
    },
  ],
})
export class VehiclesModule {}
