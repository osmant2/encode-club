import React from "react";
import { Route, Routes} from 'react-router-dom';
import Layout from "./layout/Layout";
import {Dashboard, ClaimSubmission, Allvehicle, InsurancePolicy} from "./pages/index";
// import {
//   Header,
//   Footer,
//   Bidregister,
//   Ipregister,
//   Tablen,
//   ReactTable,
//   Mint, 
//   Status, 
//   Profile,
//   NftDetails
// }
// from "./components/index";
// import Mybidding from "./pages/Mybidding/Mybidding";

function App() {

  return (
    <div className="App">
      <>
      <Layout></Layout>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/claim' element={<ClaimSubmission />} />
            <Route path='/allvehicle' element={<Allvehicle/>} />
            <Route path='/insurance' element={<InsurancePolicy />} />
           
            {/* admin routes */}
            {/* <Route path='/status/:id' element={<Status />} />
            <Route path='/bidders/:id/:address' element={<Bidder />} />
            <Route path='/mint/:id/:address' element={<Mint />} />
            <Route path='/mynfts' element={<Profile/>}/>
            <Route path='/mynftdetail/:tokenId' element={<NftDetails/>}/> */}
        </Routes>
      </>
    </div>
  )
}

export default App
