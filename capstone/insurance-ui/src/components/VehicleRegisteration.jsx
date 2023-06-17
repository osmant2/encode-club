import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { VehicleContext } from '../context/Vehicle';
import { uploadFileToIPFS } from "../pinata";
import { car1 } from "../assets/index";
import '../css/Style.css';

const VehicleRegisteration = () => {
  const { RegisterVehicle, formParams, updateFormParams } = useContext(VehicleContext); 
  const[show, setShow] = useState(false); 
  const plate = React.useRef();

  const [fileURL, setFileURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    setIsLoading(true)
    var file = e.target.files[0];
    try {
        //setFileURL(file);
        const response = await uploadFileToIPFS(file);
        if(response.success === true) {
            console.log("Uploaded image to Pinata: ", response.pinataURL)
            setFileURL(response.pinataURL);
            setIsLoading(false)
        }
    }
    catch(e) {
        console.log("Error during file upload", e);
    }
  }

  const handleSubmit = () => {
    fileURL = 'https://gateway.pinata.cloud/ipfs/QmYeoFrSJomhtrhBYXWvb5vjQoW11CUp9zRjwRvwHnEmrv';
      console.log(formParams);
      console.log("ready", plate, fileURL);
    //e.preventDefault();
   // RegisterVehicle(plate, policyId, fileURL);
  };

  return (
    <> 
    <div>
        <div className=''>
          <img src={car1} alt="" className='mx-auto py-2 h-72 my-10 rounded-xl'/>
         </div>

        <div className='flex justify-between rounded-xl bg-green-100 mx-1'>
            <div 
                className='text-gray-600 font-serif flex justify-between'>
                <form className='flex justify-center py-4'>
                <div className='fields px-10'>
                    <div className='mb-6 text-sm text-black'>
                        <h1 className='text-2xl'>Insure Your Vehicle</h1>
                    </div>
                    <div className=' flex flex-wrap'>    
                        
                        <div className="mb-4">
                        <label className=''>Vehicle Owner </label><br></br>
                        <input className='text-gray-700 border py-2 px-2 rounded w-96' 
                            placeholder="owner name" type="text" name="ownername" 
                            onChange={e => updateFormParams({...formParams, ownername: e.target.value})} 
                            value={formParams.ownername}/>
                        </div>

                        <div className="mb-4 mr-2">
                        <label className=''>Vehicle Model</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                            placeholder="vehicle model" type="text" name="model" 
                            onChange={e => updateFormParams({...formParams, model: e.target.value})} 
                            value={formParams.model}
                            />
                        </div>

                        <div className="mb-4">
                        <label className=''>Vehicle Color</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-2' 
                            placeholder="vehicle color" type="text" name="color" 
                            onChange={e => updateFormParams({...formParams, color: e.target.value})} 
                            value={formParams.color}
                            />
                        </div>
                        
                        <div className="mb-4">
                        <label className=''>License Plate</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                            placeholder="license plate" type="text" name="licenseplate" 
                            ref={plate}
                            //onChange={e => updateFormParams({...formParams, premiumAmount: e.target.value})} 
                            //value={formParams.premiumAmount}
                            />
                        </div>

                        <div>
                            <label className="block text-black mb-2" htmlFor="image">Vehicle Photo</label>
                            <input type={"file"} onChange={OnChangeFile}></input>
                            {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null}
                        </div>

                        <div className='py-3'>
                        <button onClick={handleSubmit} 
                        className='mt-5 w-28 py-2 bg-green-900 rounded hover:brightness-110 text-white text-lg cursor-pointer'>
                            Register
                        </button>
                        {/* {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null} */}
                    </div> 
                    </div>
                </div>      
                </form>
            </div>

            <div className='bg-green-900 text-white rounded-r-xl'>
                <div className='mx-4 py-4'>
                    <h1 className='text-2xl mb-6 w-96'>Summary</h1>
                    <ul className='text-lg'>
                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Owner</li>
                        <p>John Doe</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Model</li>
                        <p>BMW</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Color</li>
                        <p>white</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>License Plate</li>
                        <p>101123</p>
                        </div>    

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Photo</li>
                        <p>car.png</p>
                        </div>                                   

                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default VehicleRegisteration