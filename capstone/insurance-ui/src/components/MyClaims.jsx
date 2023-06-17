import React from 'react'
import {
  acc1,
  acc3
} from "../assets/index";
import '../css/Style.css';
import { Link } from 'react-router-dom';

const MyClaims = () => {
  return (
    <div>
      <h1 className='my-10 text-xl'>My Claims</h1>
      
      <div className='flex flex-wrap gap-10'>
        <Link to="/claimdetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={acc3} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>Car Crash</h1>
              </div>
          </div>
        </Link>

        <Link to="/claimdetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={acc1} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>Car on Fire</h1>
              </div>
          </div>
        </Link>
        
        <Link to="/claimdetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={acc3} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>Car drawned</h1>
              </div>
          </div>
        </Link>

      </div>

    </div>
  )
}

export default MyClaims