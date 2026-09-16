import express from "express";
import { getAccessToken } from "../services/mpesaAuthService.js";
import { initiateSTKPush } from "../services/stkPushService.js";

const router = express.Router();

router.get("/access-token", async (req, res) => {
    try {
        const data = await getAccessToken();

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate access token",
            error: error.response?.data || error.message
        });
    }
});

router.post("/stkpush", async (req, res) => {

    console.log("REQUEST BODY:", req.body);

    try {
        const {
            phoneNumber,
            amount,
            accountReference,
            transactionDescription
        } = req.body;

        const result = await initiateSTKPush({
            phoneNumber,
            amount,
            accountReference,
            transactionDescription
        });

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: "Failed to initiate STK Push",
            error: error.response?.data || error.message
        });
    }
});

router.post("/callback", (req, res) => {
    console.log("M-PESA Callback Received");
    console.log(JSON.stringify(req.body, null, 2));

    res.status(200).json({
        message: "Callback received successfully"
    });
});

export default router;