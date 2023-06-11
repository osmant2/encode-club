import { Module } from '@nestjs/common';
import { InsurancePoliciesController } from './insurancePolicies.controller';
import { InsurancePoliciesService } from './insurancePolicies.service';
import { Contract, ethers } from 'ethers';
import * as dotenv from 'dotenv';

import * as InsurancePoliciesContractABI from '../assets/InsurancePolicyContract.json';

dotenv.config();

@Module({
  controllers: [InsurancePoliciesController],
  providers: [
    InsurancePoliciesService,
    {
      provide: Contract,
      useFactory: async () => {
        // Connect to the Ethereum network using Alchemy provider
        const provider = new ethers.providers.AlchemyProvider(
          'maticmum', // Replace with the desired network (e.g., 'rinkeby', 'ropsten', etc.)
          process.env.ALCHEMY_API_KEY, // Fetch the Alchemy API key from the .env file
        );

        // Get the contract ABI from a JSON file
        const contractABI = InsurancePoliciesContractABI.abi;

        // Fetch the contract address from the .env file
        const contractAddress = process.env.INSURANCE_CONTRACT;

        // Create the contract instance
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider,
        );

        // Return the contract instance
        return contract;
      },
    },
  ],
})
export class InsurancePoliciesModule {}
