import express from 'express';
import https from 'https';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
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

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(helmet.hidePoweredBy());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    keyGenerator: (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      return ip ? ip.toString() : 'default';
    }
});

app.use(limiter);
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

// app.listen(port, () => {
//     signale.success("Server running in port: " + port);
// });