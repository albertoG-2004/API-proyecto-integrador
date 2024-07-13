import banana from "../models/bananaModel.js";
import { createIdService } from "../services/createIdService.js";
import { verifyWord } from "../services/verifyWordService.js";
import { getDate, getTime } from "../services/getDateService.js";

export const registerBanana = async(req, res) => {
    const data = req.body;
    
    if(!verifyWord(data.color)){
        return res.status(400).json({
            status: "error",
            message: "Invalid color",
            error: "The color must not contain special characters"
        });
    }
    if(!verifyWord(data.classification)){
        return res.status(400).json({
            status: "error",
            message: "Invalid classification",
            error: "The classification must not contain special characters"
        });
    }
    try {
        const id = await createIdService();
        const date = await getDate();
        const time = await getTime();
        
        const newBanana = new banana({
            id: id,
            date: date,
            time: time,
            color: data.color,
            classification: data.classification
        })

        await newBanana.validate();
        await newBanana.save();
        res.status(201).json({
            status: "success",
            data: {
                date: newBanana.date,
                time: newBanana.time,
                color: newBanana.color,
                classification: newBanana.classification
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
    }
}

export const findAllByDate = async(req, res) => {
    const date = req.params;

    try {
        const bananas = await banana.find({
            date
        });

        if(!bananas || bananas.length === 0){
            res.status(204).json({
                status: "success",
                message: "Data not found by condition"
            })
        }else{
            res.status(200).json({
                status: "success",
                data: bananas
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error has ocurred while processing the request",
            error: error.message
        })
    }
} 