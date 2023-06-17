import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Vehicle";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import {ethers} from 'ethers';
export const VehicleContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const VehicleContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('Vehiclecontract', VehicleContract);
  return VehicleContract;
};

export const VehicleProvider = ({ children }) => {
   const [formParams, updateFormParams] = useState({ ownername:'', model: '', color:'', image:''});
   const [textmessage, setupMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   
   
  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(fileURL) {
    const {ownername, model, color} = formParams;
    //Make sure that none of the fields are empty
    if(!ownername || !model || !color)
        return;

    const nftJSON = {
      ownername, model, color, image:fileURL
    }

    try {
        //upload the metadata JSON to IPFS
        const response = await uploadJSONToIPFS(nftJSON);
        if(response.success === true){
            console.log("Uploaded JSON to Pinata: ", response)
            return response.pinataURL;
        }
    }
    catch(e) {
        setupMessage("Error with loading");
        console.log("error uploading JSON metadata:", e)
    }
  }

  const RegisterVehicle = async (plate, policyId, fileURL) => {
    console.log("forrk", fileURL);  uploadMetadataToIPFS(fileURL)
    //Upload data to IPFS
    try {
      if(ethereum){
        const metadataURL = await uploadMetadataToIPFS(fileURL);
        const vehicleContract = createEthereumContract();
        
        const transactionHash = await vehicleContract.createVehicle(plate, policyId, metadataURL);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };



  useEffect(() => {
    //createEthereumContract();
  }, []);

  return (
    <VehicleContext.Provider
      value={{    
          RegisterVehicle,
          formParams,
          updateFormParams,
          textmessage,
          isLoading
        }}
      >
      {children}
    </VehicleContext.Provider>
  );
      }
