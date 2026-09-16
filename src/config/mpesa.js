import dotenv from "dotenv";

dotenv.config();

console.log("Consumer Key loaded:", Boolean(process.env.MPESA_CONSUMER_KEY));
console.log("Consumer Secret loaded:", Boolean(process.env.MPESA_CONSUMER_SECRET));

export const mpesaConfig = {
    consumerKey:process.env.MPESA_CONSUMER_KEY,
    consumerSecret:process.env.MPESA_CONSUMER_SECRET,
    baseUrl:'https://sandbox.safaricom.co.ke',
    businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
    passkey: process.env.MPESA_PASSKEY
}