import monitoring from "../models/monitoringModel.js";
import { conn, disconnect } from "../connection/connection.js";
import { createIdService } from "../services/createIdService.js";
import { getDate, getTime } from "../services/getDateService.js";

export const registerMonitoring = async(req, res) => {
    const data = req.body;
    
    try {
        await conn();
        
        const id = await createIdService();
        const temp = Number(data.temperature);
        const humi = Number(data.humidity);
        const weight = Number(data.weight);
        const date = await getDate();
        const time = await getTime();

        const newMonitoring = new monitoring({
            id: id,
            date: date,
            time: time,
            temperature: temp,
            humidity: humi,
            weight: weight
        });
        await newMonitoring.validate();
        await newMonitoring.save();
        res.status(201).json({
            status: "success",
            data: {
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
    const date = req.params;

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