import monitoring from "../models/monitoringModel.js";
import { conn, disconnect } from "../connection/connection.js";
import { createIdService } from "../services/createIdService.js";
import { verifyWord } from "../services/verifyWordService.js";
import { getDate, getTime } from "../services/getDateService.js";
import { sendDataMonitorings } from "../services/sendDataService.js";

export const registerMonitoring = async(req, res) => {
    const data = req.body;
    if(!verifyWord(data.box)){
        return res.status(400).json({
            status: "error",
            message: "Invalid box",
            error: "The box must be Maduros or Verdes"
        });
    }
    try {
        await conn();
        
        const id = await createIdService();
        const temp = data.temperature;
        const humi = data.humidity;
        const weight = data.weight;
        const date = await getDate();
        const time = await getTime();

        const newMonitoring = new monitoring({
            id: id,
            box: data.box,
            date: date,
            time: time,
            temperature: temp,
            humidity: humi,
            weight: weight
        });
        console.log(newMonitoring);
        await newMonitoring.validate();
        await newMonitoring.save();
        await sendDataMonitorings(newMonitoring)
        res.status(201).json({
            status: "success",
            data: {
                box: newMonitoring.box,
                date: newMonitoring.date,
                time: newMonitoring.time,
                temperature: newMonitoring.temperature,
                humidity: newMonitoring.humidity,
                weight: newMonitoring.weight
            },
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({
                status: "error",
                message: "Invalid data",
                error: error.message
            });
        } else {
            res.status(500).json({
                status: "error",
                message: "An error has ocurred while creating the register",
                error: error.message
            });
        }
    } finally {
        await disconnect();
    }
}

export const findAllByDate = async(req, res) => {
    const date = req.params.date;

    try {
        await conn();
        
        const monitorings = await monitoring.find({
            date
        });

        if(!monitorings || monitorings.length == 0){
            res.status(204).json({
                status: "success",
                message: "Data not found by condition"
            })
        }else{
            res.status(200).json({
                status: "success",
                data: monitorings
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error has ocurred while processing the request",
            error: error.message
        })
    } finally {
        await disconnect();
    }
} 