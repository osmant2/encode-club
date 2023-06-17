import React, {useContext} from "react";
import { Route, Routes} from 'react-router-dom';
import Layout from "./layout/Layout";
import {
  Dashboard, 
  ClaimSubmission, 
  Allvehicle, 
  InsurancePolicyRegister, 
  VehicleRegisteration,
  AllClaims,
  Policies,
  MyClaim,
  MyVehicle,
  PolicyDetails,
  ClaimDetails
} from "./pages/index";
import { InsuranceContext } from './context/InsurancePolicy';

function App() {
  const { connectWallet, currentAccount } = useContext(InsuranceContext);
  console.log("marsh", currentAccount);
  return (
    <>
    <div className="flex gap-2 my-2 justify-between">
        <Layout></Layout>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/claimsubmission' element={<ClaimSubmission />} />
            <Route path='/allclaims' element={<AllClaims/>} />
            <Route path='/allvehicle' element={<Allvehicle/>} />
            <Route path='/myclaims' element={<MyClaim/>} />
            <Route path='/myvehicles' element={<MyVehicle/>} />
            <Route path='/vehicleregisteration' element={<VehicleRegisteration/>} />
            <Route path='/insurancepolicyregister' element={<InsurancePolicyRegister />} />
            <Route path='/allpolicies' element={<Policies/>}/>
            <Route path='/policydetail' element={<PolicyDetails/>}/>
            <Route path='/claimdetail' element={<ClaimDetails/>}/>
            {/* admin routes */}
            {/* <Route path='/status/:id' element={<Status />} />
            <Route path='/bidders/:id/:address' element={<Bidder />} />
            <Route path='/mint/:id/:address' element={<Mint />} />
            <Route path='/mynfts' element={<Profile/>}/>
            <Route path='/mynftdetail/:tokenId' element={<NftDetails/>}/> */}
        </Routes>
          <div className='text-center mr-1'>
            <button
                onClick={connectWallet}
                className='bg-green-900 p-2 w-32 rounded text-white hover:brightness-110'>
                Connect Wallet
            </button>

            <div className="my-5">
              {currentAccount? <p className="text-green-500">CONNECTED</p>: <p className="text-red-500">NOT CONNECTED</p>}
              {/* <p>Vehicle Insurance</p> */}
            </div>
          </div>
    </div>
    </>
  )
}

export default App
