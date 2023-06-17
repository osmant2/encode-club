import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { ClaimContext } from '../context/Claim';
import { uploadFileToIPFS } from "../pinata";
import { FaHourglass } from "react-icons/fa";
import '../css/Style.css';
import {
  acc2
} from "../assets/index";

const ClaimSubmission = () => {
  const { SubmitClaim, formParams, updateFormParams } = useContext(ClaimContext); 
  const[show, setShow] = useState(false); 
  const index = React.useRef();
  const policyId = React.useRef();

  const [fileURL, setFileURL] = useState(null);
  const [dataURL, setDataURL] = useState(null);
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

    //This function uploads the NFT image to IPFS
    async function OnChangeDataFile(e) {
      setIsLoading(true)
      var file = e.target.files[0];
      try {
          //setFileURL(file);
          const response = await uploadFileToIPFS(file);
          if(response.success === true) {
              console.log("Uploaded image to Pinata: ", response.pinataURL)
              setDataURL(response.pinataURL);
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
      console.log("ready", dataURL, fileURL);
    //e.preventDefault();
   // RegisterVehicle(plate, policyId, fileURL);
  };

  return (
    <>    
    <div>

      <div className=''>
          <img src={acc2} alt="" className='mx-auto py-2 h-96 rounded-xl'/>
      </div>

      <div className='flex justify-between rounded-xl bg-green-100 mx-20'>
          <div 
              className='text-gray-600 font-serif flex justify-between'>
              <form className='flex justify-center py-4'>
              <div className='fields px-10'>
                  <div className='mb-6 text-sm text-black'>
                      <h1 className='text-2xl'>Submit Claim</h1>
                  </div>
                  <div className=' flex flex-wrap'>    
                  <div className="mb-4 mr-2">
                      <label className=''>Cause of Claim</label><br></br>
                          <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                          placeholder="cause of claim in one sentence" type="text" name="cause" 
                          onChange={e => updateFormParams({...formParams, cause: e.target.value})} 
                          value={formParams.cause}
                          />
                      </div>

                      <div className="mb-4">
                      <label className=''>Occurance Location</label><br></br>
                          <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-2' 
                          placeholder="occurance location" type="text" name="location" 
                          onChange={e => updateFormParams({...formParams, location: e.target.value})} 
                          value={formParams.color}
                          />
                      </div>

                      <div className="mb-4 mr-2">
                      <label className=''>Claim Description</label><br></br>
                          <textarea className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                          placeholder="claim description" type="text" name="description" 
                          onChange={e => updateFormParams({...formParams, description: e.target.value})} 
                          value={formParams.description}
                          />
                      </div>
                      
                      <div className="mb-4">
                      <label className=''>Date</label><br></br>
                          <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5 mb-3' 
                          placeholder="occurance date" type="date" name="date" 
                          onChange={e => updateFormParams({...formParams, date: e.target.value})} 
                          value={formParams.date}
                          />
                      </div>

                      <div>
                          <label className="block text-black mb-2" htmlFor="image">Medical File Upload</label>
                          <input type={"file"} onChange={OnChangeDataFile} className='mb-7'></input>
                          {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null}
                      </div>

                      <div>
                          <label className="block text-black mb-2" htmlFor="image">Accident Photo</label>
                          <input type={"file"} onChange={OnChangeFile}></input>
                          {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null}
                      </div>

                      <div className='py-3'>
                      <button onClick={handleSubmit} 
                      className='mt-5 w-28 py-2 bg-green-900 rounded hover:brightness-110 text-white text-lg cursor-pointer'>
                          Claim
                      </button>
                      {/* {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null} */}
                  </div> 
                  </div>
              </div>      
              </form>
          </div>

          <div className='bg-green-900 text-white rounded-r-xl'>
          <div className='mx-4 py-4'>
                  <h1 className='text-2xl mb-6 w-96'>Vehicle Info</h1>
                  <ul className='text-lg'>
                      <div className='flex justify-between mb-6'>
                      <li>Owner Name</li>
                      <p>John Doe</p>
                      </div>

                      <div className='flex justify-between mb-6'>
                      <li>Model</li>
                      <p>BMW</p>
                      </div>  

                      <div className='flex justify-between mb-6'>
                      <li>Color</li>
                      <p>White</p>
                      </div>

                      {/* <div className='flex justify-between mb-6'>
                      <li>Date</li>
                      <p>10/10/2020</p>
                      </div>                                 */}
                  </ul>
              </div>
                        <hr className='mx-5'/>
              <div className='mx-4 py-4'>
                  <h1 className='text-2xl mb-6 w-96'>Summary</h1>
                  <ul className='text-lg'>
                      <div className='flex justify-between mb-6'>
                      <li>Claim Description</li>
                      <p>coverage</p>
                      </div>

                      <div className='flex justify-between mb-6'>
                      <li>Occurance Location</li>
                      <p>jemo, A.A</p>
                      </div>  

                      <div className='flex justify-between mb-6'>
                      <li>Date</li>
                      <p>10/10/2020</p>
                      </div>  

                      <div className='flex justify-between mb-6'>
                      <li>Medical File</li>
                      <p>cov.png</p>
                      </div>

                      <div className='flex justify-between mb-6'>
                      <li>Accident Photo</li>
                      <p>acc.png</p>
                      </div>                                  
                  </ul>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default ClaimSubmission