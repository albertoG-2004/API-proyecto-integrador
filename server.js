import express from 'express';
import { conn } from './src/connection/connection.js';
import routesUser from './src/routes/userRoute.js';
import routesBanana from './src/routes/bananaRoute.js';
import routesMonitoring from './src/routes/monitoringRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", routesUser);
app.use("/bananas", routesBanana);
app.use("/monitorings", routesMonitoring)

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log('API listening in port: '+port);
})
conn();