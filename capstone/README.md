# Project Description:

The decentralized insurance system integrates crypto wallets, specifically leveraging the built-in crypto wallet integration of Alchemy's Create-Web3-Dapp package on the frontend. This allows for seamless user identification, authorization, and authentication by utilizing the secure and decentralized nature of crypto wallets. By removing the need for traditional usernames and passwords, the system enhances security and privacy while providing a user-friendly experience.

The backend, built with NestJS, complements the frontend by providing a fully functional and tested API. The endpoints enable users to interact with the system using standard HTTP requests. User actions such as registering vehicles, creating insurance policies, submitting claims, and retrieving policy and claim information are seamlessly handled through the API. The backend interacts with the smart contracts deployed on Alchemy, which acts as the provider for the blockchain network.


## Some (Imaginative :)) Use-Cases:
### Vehicle and Policy Verification:
The decentralized insurance system can be utilized for vehicle and policy verification by external entities such as regulatory authorities or financial institutions. The API allows these entities to query the system using specific parameters, such as owner addresses or policy IDs, to verify the existence and status of vehicles and insurance policies. This use-case enhances trust and transparency, enabling regulatory compliance and facilitating secure transactions, such as vehicle financing or cross-border travel with insurance coverage.

### Policy Management:
Insurance companies can leverage the decentralized system to manage policies effectively. Through the API, insurers can create new policies, specify premium amounts, and update policy statuses as needed. The use of smart contracts ensures accurate and tamper-proof policy data, reducing the risk of fraud or data manipulation. Insurers can also retrieve policy information and associated claims easily, providing a comprehensive view of the policy lifecycle. This use-case simplifies policy administration, enhances data integrity, and enables insurers to offer better customer service.

### Claims Processing:
The decentralized insurance system offers a use-case where policyholders can submit claims directly through the API, providing all the necessary details and supporting documentation. The smart contracts automatically validate the claim and initiate the review process. Claims adjusters can access the system to evaluate claims efficiently, reducing manual paperwork and streamlining the overall process. This use-case improves transparency and accelerates claims processing, ensuring policyholders receive timely and fair settlements.

## A Real-Worl Scenario:
### Angela's Decentralized Insurance Journey

Step 1: Account Setup
Angela discovers a decentralized insurance system that leverages crypto wallets for user identification and authorization. She installs the MetaMask wallet extension in her browser and creates a new wallet. After setting up her wallet, Angela accesses the system's web application, which seamlessly integrates with MetaMask using Alchemy's Create-Web3-Dapp package. Through this integration, Angela's wallet serves as her unique identifier and grants her access to the decentralized insurance system.

Step 2: Vehicle Registration and Insurance Policy Creation
Angela recently purchased a new car and wants to insure it. She navigates to the system's interface and selects the "Register Vehicle" option. Angela provides the necessary details about her vehicle, such as the license plate, and submits the registration request. The system securely records her vehicle information on the blockchain, associating it with her wallet address.

Next, Angela proceeds to create an insurance policy for her vehicle. She selects the "Create Policy" option and specifies the desired coverage and premium amount. The smart contract deployed on Alchemy validates the policy details and generates a unique policy ID. Angela's wallet seamlessly signs and confirms the policy creation transaction on the blockchain, officially binding the insurance policy to her vehicle.

Step 3: Claim Submission and Processing
Several months later, Angela unfortunately gets into a car accident and needs to file a claim. She accesses the decentralized insurance system through her wallet-enabled interface. Angela selects the "Submit Claim" option, providing a detailed description of the incident and attaching relevant documents, such as photos and the police report.

Once Angela submits the claim, the smart contract receives the information and triggers the claim processing workflow. Claims adjusters from Angela's insurance company access the system's API, retrieving the claim details by querying the smart contract on Alchemy. They review the submitted documents and assess the damages to determine the claim's validity. The adjusters update the claim status through the system's API, which triggers a transaction on the blockchain, securely updating the claim's status.

## Some Out-takes For the Presentation If Needed:
1-Increased Security and Privacy: By leveraging crypto wallets for user identification and authorization, the decentralized insurance system ensures enhanced security and privacy. Traditional username/password authentication is replaced with the cryptographic security of crypto wallets, reducing the risk of unauthorized access and identity theft.

2-Transparent and Immutable Records: The utilization of blockchain technology eliminates the need for a centralized database. Instead, the system leverages the blockchain as a transparent and immutable ledger, recording vehicle registrations, insurance policies, and claim submissions. This provides a tamper-proof and auditable record of all interactions within the system.

3-Streamlined Claims Processing: With the decentralized insurance system, claims processing becomes streamlined and efficient. Through the integration of smart contracts, claims adjusters can quickly access claim information and documents, accelerating the assessment and decision-making process. This results in faster claim settlements and a smoother experience for policyholders.

4-User-Centric Experience: The integration of Alchemy's Create-Web3-Dapp package on the frontend enables a user-centric experience. Users like Angela can seamlessly interact with the system using their preferred crypto wallet, eliminating the need for separate login credentials and providing a familiar and secure environment.

5-Scalability and Reliability: Alchemy's infrastructure, used as the provider for the smart contracts, ensures scalability and reliability of the decentralized insurance system. With Alchemy's robust infrastructure, the system can handle a large number of users and transactions, providing a seamless experience even during peak periods.

6-Future Innovations: The decentralized insurance system opens the door for future innovations in the insurance industry. The use of blockchain technology allows for the exploration of new insurance models, such as peer-to-peer insurance or parametric insurance, providing opportunities for increased efficiency and cost-effectiveness.



--------------------

## Technical Blueprints:
### Contracts:

#### ClaimsContract.sol:
The ClaimsContract.sol contract manages insurance claims submitted by policyholders. It includes the following key features:

    -It is an Ownable contract, allowing the owner to manage and update claim statuses.
    -The contract defines an enum ClaimStatus with three possible values: Submitted, Accepted, and Rejected.
    -It has a struct Claim that represents an individual claim, consisting of fields such as claimId, policyId, claimant address, description, and status.
    -The contract maintains a mapping claims that maps claimIds to Claim structs, allowing efficient retrieval and storage of claims.
    -It includes an event ClaimSubmitted that emits when a new claim is submitted, and an event ClaimStatusUpdated that emits when the status of a claim is updated.
    -The constructor takes the address of an InsurancePolicyContract as a parameter and sets it as a reference.
    -The submitClaim function allows a policyholder to submit a new claim. It performs validations on the inputs, checks if the policy exists, and associates the claim with the policy by calling associateClaim in the InsurancePolicyContract.
    -The getClaim function retrieves information about a specific claim based on the claimId.
    -The updateClaimStatus function allows the contract owner to update the status of a claim.
    -The listAllClaims function returns an array of all claims submitted.

#### InsurancePolicyContract.sol:
The InsurancePolicyContract.sol contract manages insurance policies and their associated claims. The contract includes the following features:

    -It is an Ownable contract, allowing the owner to manage and update policy statuses.
    -The contract defines an enum PolicyStatus with two possible values: Active and Inactive.
    -It has a struct PolicyInfo representing basic policy information, including policyId and owner address.
    -It has a struct InsurancePolicy that represents an individual policy, including fields like policyId, owner address, premiumAmount, status, and an array of associated claimIds.
    -The contract maintains a mapping policies that maps policyIds to InsurancePolicy structs.
    -It includes events such as PolicyCreated (emitted when a new policy is created), PolicyStatusUpdated (emitted when the status of a policy is updated), and ClaimAssociated (emitted when a claim is associated with a policy).
    -The constructor sets the contract deployer as the owner.
    -The createPolicy function allows users to create a new insurance policy by specifying the premium amount. It validates the input and emits a PolicyCreated event.
    -The getPolicy function retrieves detailed information about a specific policy based on the policyId.
    -The getInsurancePoliciesByOwner function returns an array of policyIds owned by a specific address.
    -The listInsurancePolicies function returns an array of PolicyInfo structs, representing all insurance policies.
    -The updatePolicyStatus function allows the contract owner to update the status of a policy.
    -The associateClaim function associates a claim with a policy by adding the claimId to the claimIds array of the corresponding policy.

#### VehicleContract.sol:
The VehicleContract.sol contract manages vehicle information, specifically the license plate for each vehicle. Key features of the contract include:

    -It is an Ownable contract, allowing the owner to manage vehicle information.
    -The contract includes a struct Vehicle representing a vehicle with a single field: licensePlate.
    -The contract maintains a mapping vehicles that maps vehicle owners' addresses to Vehicle structs.
    -It includes an event VehicleCreated emitted when a new vehicle is created.
    -The createVehicle function allows users to create a new vehicle by specifying the license plate. It checks if the license plate is not empty and if a vehicle for the owner address doesn't already exist.
    -The getVehicle function retrieves the license plate of a specific vehicle owner.
    -The updateLicensePlate function allows vehicle owners to update the license plate for their vehicles.
    -The vehicleExists function checks if a vehicle exists for a specific owner.
    -The listVehicles function returns an array of VehicleInfo structs, representing all vehicles in the contract.

### Backend Endpoints

The backend API provides a set of endpoints that interact with the underlying smart contracts to facilitate the following operations:

#### Vehicle Management:

    -GET /vehicles: Retrieves a list of all vehicles registered in the system.
    -POST /vehicles: Allows users to register a new vehicle by providing the necessary information, such as the owner's address and the vehicle's license plate.
    -GET /vehicles/{ownerAddress}: Retrieves the vehicle information associated with a specific owner's address.
    -PATCH /vehicles/{ownerAddress}: Allows users to update the license plate of their registered vehicle.

#### Insurance Policy Management:

    -GET /insurance-policies: Retrieves a list of all insurance policies available in the system.
    -POST /insurance-policies: Enables users to create a new insurance policy by specifying the premium amount and other relevant details.
    -GET /insurance-policies/{policyId}: Retrieves detailed information about a specific insurance policy using its unique policy ID.
    -PATCH /insurance-policies/{policyId}/status: Allows the contract owner to update the status of a specific insurance policy (e.g., from active to inactive).
    -POST /insurance-policies/{policyId}/claims: Associates a new claim with a particular insurance policy by providing the claim details.

#### Claim Management:

    -GET /claims: Retrieves a list of all submitted claims.
    -POST /claims: Enables users to submit a new claim by providing the necessary information, such as the policy ID, claimant address, and claim description.
    -GET /claims/{claimId}: Retrieves detailed information about a specific claim using its unique claim ID.
    -PATCH /claims/{claimId}/status: Allows the contract owner to update the status of a specific claim (e.g., from submitted to accepted or rejected).


# Setup (Smart Contracts and Backend) For Development

WARNING: There are 2 .env files, one inside the "hardhat" folder, other is inside the "backend" folder.

- Get your Metamask Private Key from Metamask application and put it into the .env files' PRIVATE_KEY section inside double quotes. Ex: PRIVATE_KEY="asjkdkjashdkjh"

- Create an Alchemy App on the Alchemy Platform with a registered account. Prefer Polygon Mumbai under the Polygon PoS chain. After creation is complete, view your application key by pressing the view key button and copy the API KEY. After that put that key inside your .env files' ALCHEMY_API_KEY with the same format you did with your private key.

- Open a terminal, go to the hardhat directory and run the comman below:

    yarn hardhat run ./scripts/DeployOnAlchemy.ts

- It will give you an output like below:

    Vehicle Contract is deployed at address 0xb1eFFD6DFca0232854A1771B05805b2E864f7468 at block 36712274
    Insurance Policy Contract is deployed at address 0x1222F5B29F39978DE42A67E2433192aE5De25F36 at block 36712274
    Claim Contract is deployed at address 0x5458791dDF8bf2b565fDaE45608998E0BC5c0cfd at block 36712278
    InsuranceToken Contract is deployed at address 0xf937A1be4F4B75f2069D847708E09A0040e4c53F at block 36712281

- Copy the addreses for each contract and paste in the backend's .env file. To the relevant lines of course. Now the contract's are deployed!

- Now go to the backend directory and run the command below:
    
    yarn start dev

- Open a browser and access the swagger by navigating to "http://localhost:3001/api#/"

- If you want to add more functionality or change existing functions, use hardhat. But keep this in mind, since this project has a multi-contract structure you need to use Hardhat server.

    - To start a Hardhat Server, go to your Hardhat directory and run the command:
        yarn hardhat node

    - It will start a server. Don't close the terminal window!

    - In another terminal window you can run your scripts by indicating your server as a parameter. like this:
        yarn hardhat run ./scripts/NewScript.ts --network localhost
        
## Workflow:
 
#### Vehicle Registration:
        - All vehicles' information can be accessed by making a GET request to the /vehicles endpoint.
        - To register a new vehicle, users make a POST request to the /vehicles endpoint.
        - Users provide license plate in the request body.
        - The system records the vehicle information on the blockchain.

#### Insurance Policy Management:
        - All policy informationcan be accessed by making a GET request to the /insurance-policies endpoint.
        - To create a new insurance policy, users make a POST request to the /insurance-policies endpoint.
        - User provide the policy details, (only premium amount for now) in the request body.
        - The system generates a policy ID (starting from 0), records the policy on the blockchain.
        - Users can also retrieve specific insurance policies by making a GET request to the /insurance-policies/{policyId} endpoint, providing the policy ID in the URL.

#### Claim Submission and Processing:
        - To submit a claim, users make a POST request to the /claims endpoint.
        - They provide the necessary details such as the policy ID and description in the request body.
        - Users can track their claims by making a GET request to the /claims endpoint, which retrieves and displays a list of all submitted claims.
        - Adjusters (admins) from the insurance company can access and process claims by making GET requests to the /claims/{claimId} endpoint, providing the claim ID in the URL.
        - They can update the claim status by making a PATCH request to the /claims/{claimId}/status endpoint, providing the claim ID and the new status in the request body.

# Warning: You need to implement a claim update mechanism (manual or automatic) after user submits a claim!

## Current State of Insurance Token and Note About Security:

Currently system is not using InsuranceToken. You can delete the contract or you can implement some relevant functionality and use it. Premium amount in the insurances are display only.

Also, there should be more owner and msg.sender checks in the contracts in order to ensuring security. But some of my implementations broke the contracts, so I removed them. You can add in the necessary places.
 

It was a pleasure to work with you guys! I wish you the best! Hope you can manage it.
