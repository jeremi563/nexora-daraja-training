import axios  from "axios";
import { mpesaConfig } from "../config/mpesa.js";

export const getAccessToken  = async () =>{
    try{
        const auth = Buffer
           .from(
            `${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`
           )
           .toString("base64");

        const response = await axios.get(
            `${mpesaConfig.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
            {
              
                headers:{
                    Authorization:`Basic ${auth}`
                }
            }
        )

       return response.data;
    }
   catch (error) {
    console.error("M-PESA Authentication Error");

    console.error("Status:", error.response?.status);

    console.error("Data:", error.response?.data);

    console.error("Message:", error.message);

    throw error;
}
    
}