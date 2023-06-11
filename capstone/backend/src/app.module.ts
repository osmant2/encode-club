import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { InsurancePoliciesModule } from './insurancePolicies/insurancePolicies.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the configuration module
    VehiclesModule, // Import the vehicles module
    InsurancePoliciesModule, // Import the insurance policies module
    ClaimsModule, // Import the claims module
  ],
})
export class AppModule {}
