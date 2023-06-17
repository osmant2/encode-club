import React from 'react';
import {
  banner3, 
  tire,
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  truck,
  bus,
} from "../assets/index";
import '../css/Style.css';
import AllPolicy from '../components/AllPolicy'

const Dashboard = () => {
  return (
    <div className='my-12'>
        <div>
          <img src={tire} alt="" className='relative h-[20rem] w-[60rem] py-1 bg-cover bg-green-900 rounded-xl'/>
          <div class="absolute top-0 my-14 h-[20rem] w-[60rem] flex justify-center items-center rounded-xl backdrop-brightness-50">
              <span class="text-white text-4xl w-1/2 text-center">Nothing Works Better Than an Insurance</span>
        </div>
        <p className='text-center text-4xl text-gray-400 italic'>Lucky, you crashed into us</p>
      </div>
      <h1 className='my-10 text-xl'>Available Policies</h1>
      
      <div className=''>
        <AllPolicy/>
      </div>

    </div>
  )
}

export default Dashboard