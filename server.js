import express from 'express';
import https from 'https';
import fs from 'fs';
import { conn } from './src/connection/connection.js';
import routesUser from './src/routes/userRoute.js';
import routesBanana from './src/routes/bananaRoute.js';
import routesMonitoring from './src/routes/monitoringRoute.js';
import cors from 'cors';
import pkg from 'signale';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const app = express();
const { Signale } = pkg;
const sigOptions = {
    secrets: ["([0-9]{4}-?)+"]
};
const signale = new Signale(sigOptions);

app.use(cors());
app.use(express.json());
app.use(helmet.hidePoweredBy());

app.use("/users", routesUser);
app.use("/bananas", routesBanana);
app.use("/monitorings", routesMonitoring);

const options = {
    key: fs.readFileSync(process.env.RUTA_SSL_KEY),
    cert: fs.readFileSync(process.env.RUTA_SSL_CERTIFICATE)
};

https.createServer(options, app).listen(port, () => {
    signale.success("Server running in port: " + port);
});
conn();