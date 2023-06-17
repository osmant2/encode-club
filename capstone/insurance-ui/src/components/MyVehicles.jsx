import React from 'react'
import {
  car5,
  car6,
  truck
} from "../assets/index";
import '../css/Style.css';
import { Link } from 'react-router-dom';

const MyVehicles = () => {
  return (
    <div>
      <h1 className='my-10 text-xl'>My Vehicles</h1>
      
      <div className='flex flex-wrap gap-10'>
        <div 
          className='card bg-green-100 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <img src={car5} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='card transform uppercase text-center text-xl'>BMW</h1>
            </div>
            <div className='text-center my-3'>
             <Link to='/claimsubmission'><button className='btn-box px-10 py-4 shadow-sm'>Claim</button></Link> 
            </div>
        </div>

        <div 
            className='card bg-green-100 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={truck} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>NISSAN</h1>
          </div>
          <div className='text-center my-3'>
             <Link to="/claimsubmission"><button className='btn-box px-10 py-4 shadow-sm'>Claim</button></Link> 
            </div>
        </div>

        <div 
          className='card bg-green-100 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <img src={car6} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='card transform uppercase text-center text-xl'>TOYOTA</h1>
            </div>
            <div className='text-center my-3'>
            <Link to="/claimsubmission"><button className='btn-box px-10 py-4 shadow-sm'>Claim</button></Link>
            </div>
        </div>

      </div>

    </div>
  )
}

export default MyVehicles