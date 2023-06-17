import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Insurancepolicy";
import {ethers} from 'ethers';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";

export const InsuranceContext = React.createContext();
//const ethers = require("ethers");

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const InsuranceContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('Insurancecontract', InsuranceContract);
  return InsuranceContract;
};

export const InsuranceProvider = ({ children }) => {
  const [formParams, updateFormParams] = useState({ policyname: '', description: '', image:'' });
  const [currentAccount, setCurrentAccount] = useState("");
  const [textmessage, setupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return setupMessage("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //window.location.reload();
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
        console.log("accounts found");
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return setupMessage("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      setupMessage('You are Connected!');
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(fileURL) {
    const {policyname, description} = formParams;
    // console.log("get",IPname);
    // console.log("this",fileURL);
    //Make sure that none of the fields are empty
    if( !policyname || !description)
        return;

    const nftJSON = {
      policyname, description, image:fileURL
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

  const CreatePolicy = async (premiumAmount, fileURL) => {
    console.log("forrk", fileURL);  uploadMetadataToIPFS(fileURL)
    //Upload data to IPFS
    try {
      if(ethereum){
        const metadataURL = await uploadMetadataToIPFS(fileURL);
        const policyContract = createEthereumContract();
        
        const transactionHash = await policyContract.createPolicy(premiumAmount, metadataURL);

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
    checkIfWalletIsConnect();
  }, []);

  return (
    <InsuranceContext.Provider
      value={{    
        CreatePolicy,
        connectWallet,
        currentAccount,
        updateFormParams,
        formParams
        }}
      >
      {children}
    </InsuranceContext.Provider>
  );
      }
