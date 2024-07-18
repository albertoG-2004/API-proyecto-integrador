import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretJWT = process.env.SECRET_WORD;

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                status: "error",
                message: "No token provided"
            });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretJWT, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "error",
                    message: "Error validating token",
                    error: err.message
                });
            }

            req.user = decoded.user;
            next();
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error has occurred while validating token",
            error: error.message
        });
    }
};

export default verifyJWT;