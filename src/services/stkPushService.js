import axios from "axios";
import { mpesaConfig } from "../config/mpesa.js";
import { getAccessToken } from "./mpesaAuthService.js";


const getTimestamp = ()=>{
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth()+ 1).padStart(2,"0");
    const day = String(now.getDate()).padStart(2,"0");
    const hours = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2,"0");
    const seconds = String(now.getSeconds()).padStart(2,"0");
    return(`${year}${month}${day}${hours}${minutes}${seconds}`);
};

const generatePassword = (timestamp) =>{
    const passwordString = `${mpesaConfig.businessShortCode}${mpesaConfig.passkey}${timestamp}`;

    return Buffer
          .from(passwordString)
          .toString("base64");
}

export const initiateSTKPush = async({
    phoneNumber,
    amount,
    accountReference,
    transactionDescription
})=>{

    

       try{
    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);

    const { access_token }  = await getAccessToken();

    const requestBody  = {
        BusinessShortCode:mpesaConfig.businessShortCode,
        Password:password,
        Timestamp:timestamp,
        TransactionType:"CustomerPayBillOnline",
        Amount:amount,
        PartyA:phoneNumber,
        PartyB:mpesaConfig.businessShortCode,
        PhoneNumber:phoneNumber,
        CallBackURL:"https://prefraternal-krystle-uncogently.ngrok-free.dev/api/mpesa/callback",
        AccountReference:accountReference,
        TransactionDesc:transactionDescription

    }

 
       const response = await axios.post(
        `${mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
        requestBody,
        {
            headers:{
                Authorization:`Bearer ${access_token}`,
                "Content-Type":"application/json"
            }
        }
    )
    return response.data;  
    }
    catch(error){
        console.error("STK Push Error");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Message:", error.message);

    throw error;
    }

   

    
}

export {
    getTimestamp,
    generatePassword
}