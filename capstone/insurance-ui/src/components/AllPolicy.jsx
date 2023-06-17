import React from 'react'
import {
  car5,
  car6,
  truck,
  bus,
} from "../assets/index";
import '../css/Style.css';
import { Link } from 'react-router-dom';

const AllPolicy = () => {
  return (
    <div>
      {/* <h1 className='my-10 text-xl'>All Policies</h1> */}
      
      <div className='flex flex-wrap gap-10'>
       <Link to="/policydetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={car6} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>auto liability coverage</h1>
              </div>

              <div className='mx-5 text-center'>
                <p>Yearly Premium Amount: <strong>1000USD</strong> </p>
              </div>
          </div>
        </Link>

        <Link to="/policydetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={truck} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>collision coverage</h1>
              </div>

              <div className='mx-5 text-center'>
                <p>Yearly Premium Amount: <strong>1000USD</strong> </p>
              </div>
          </div>
        </Link>

        <Link to="/policydetail">
          <div 
            className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
          >
            <img src={bus} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
              <div>
                <h1 className='card transform uppercase text-center text-xl'>comprehensive coverage</h1>
              </div>

              <div className='mx-5 text-center'>
                <p>Yearly Premium Amount: <strong>1000USD</strong> </p>
              </div>
          </div>
        </Link>
        
      </div>

    </div>
  )
}

export default AllPolicy