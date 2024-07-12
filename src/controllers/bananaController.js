import banana from "../models/bananaModel.js";
import { createIdService } from "../services/createIdService.js";

export const registerBanana = async(req, res) => {
    const data = req.body;

    try {
        const id = await createIdService();

        const newBanana = new banana({
            id: id,
            date: new Date(data.date),
            color: data.color,
            classification: data.classification
        })

        await newBanana.validate();
        await newBanana.save();
        res.status(201).json({
            status: "success",
            data: {
                date: newBanana.date,
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