import user from '../models/usersModel.js';
import { conn, disconnect } from "../connection/connection.js";
import { createIdService } from '../services/createIdService.js';
import { verifyPhone } from '../services/verifyPhoneService.js';
import { verifyWord } from '../services/verifyWordService.js';
import { verifyEmail } from '../services/verifyEmailService.js';
import { verifyPassword } from '../services/verifyPasswordService.js';
import { encryptPassword, authPassword } from '../services/encryptPasswordService.js';
import { createToken } from '../services/createTokenService.js';
import { sendToken } from '../services/sendTokenService.js';

export const registerUser = async(req, res) => {
    const data = req.body;

    if(!verifyWord(data.name)){
        return res.status(400).json({
            status: "error",
            message: "Invalid name",
            error: "The name must not contain special characters, only accents"
        });
    }
    if(!verifyWord(data.last_name)){
        return res.status(400).json({
            status: "error",
            message: "Invalid last name",
            error: "The last name must not contain special characters, only accents"
        });
    }
    if(!verifyWord(data.sur_name)){
        return res.status(400).json({
            status: "error",
            message: "Invalid sur name",
            error: "The sur name must not contain special characters, only accents"
        });
    }
    if(!verifyPhone(data.phone_number)){
        return res.status(400).json({
            status: "error",
            message: "Invalid cellphone number",
            error: "The cellphone number must be a 10-digit number not starting with 0"
        });
    }
    if(!verifyEmail(data.email)){
        return res.status(400).json({
            status: "error",
            message: "Invalid email",
            error: "It must have the structure example@gmail.com"
        });
    }
    if(!verifyPassword(data.password)){
        return res.status(400).json({
            status: "error",
            message: "Invalid password",
            error: "Must contain at least 8 characters"
        });
    }
    try {
        await conn();

        const auxId = await createIdService();
        const pass = await encryptPassword(data.password);

        const newUser = new user({
            id: auxId,
            name: data.name,
            last_name: data.last_name,
            sur_name: data.sur_name,
            phone_number: data.phone_number,
            email: data.email,
            password: pass
        });
        await newUser.validate();
        await newUser.save();
        res.status(201).json({
            status: "success",
            data: {
                name: newUser.name,
                last_name: newUser.last_name,
                sur_name: newUser.sur_name,
                phone_number: newUser.phone_number,
                email: newUser.email,
                password: newUser.password
            },
        });
    } catch (error) {
        res.status(204).json({
            status: "error",
            data: "An error has ocurred",
            messages: error
        });
        console.log("Error: ", error);
    } finally {
        await disconnect();
    }
}

export const findUser = async(req, res) => {
    const params = req.params;
     
    try {
        await conn();

        const userFound = await user.findOne({
            phone_number: params.phone_number
        });

        if(!userFound) {
            res.status(404).json({
                status:"error",
                data: {
                   message: "User not found!"
                }
            });
        } else {
            if(authPassword(params.password, userFound.password)){
                const token = createToken(userFound.id);
                sendToken(token);
                res.status(200).json({
                    status:"success",
                    data: {
                        token: token
                    }
                });
            }else{
                res.status(400).json({
                    status:"error",
                    data: {
                       message: "Password incorrect!"
                    }
                });
            }
        }
    } catch (error) {
        res.status(204).json({
            status: "error",
            data: "An error has ocurred",
            messages: error
        });
        console.log("Error: ", error);
    } finally {
        await disconnect();
    }
}

export const updateUser = async(req, res) => {
    const data = req.body;

    if(!verifyPhone(data.phone_number)){
        return res.status(400).json({
            status: "error",
            message: "Invalid cellphone number",
            error: "The cellphone number must be a 10-digit number not starting with 0"
        });
    }
    if(!verifyPassword(data.password)){
        return res.status(400).json({
            status: "error",
            message: "Invalid password",
            error: "Must contain at least 8 characters"
        });
    }
    try {
        await conn();
        
        const pass = await encryptPassword(data.password);
        const response = await user.updateOne({
            phone_number: data.phone_number
        },{
            $set:{
                password: pass
            }
        });

        if(response.modifiedCount != 0){
            return res.status(200).json({
                status: "success",
                message: "User password updated successfully"
            });
        }else{
            return res.status(404).json({
                status: "error",
                message: "User not found or no changes made",
                error: "No user found with the provided phone number or the password is the same as the current one"
            });
        }
    } catch (error) {
        res.status(204).json({
            status: "error",
            data: "An error has ocurred",
            messages: error
        });
        console.log("Error: ", error);
    } finally {
        await disconnect();
    }
}