import express from 'express';
import dotenv from 'dotenv';
import mpesaRoutes from './routes/mpesaRoutes.js'
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) =>{
    res.json({
        message:"Mpesa daraja api server is runningJ"
    })
})

app.use('/api/mpesa',mpesaRoutes)

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
})