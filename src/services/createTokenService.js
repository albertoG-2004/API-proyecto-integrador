import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = (id) => {
    const secretWord = process.env.SECRET_WORD;
    const payload = {
        id: id
    }
    const token = jwt.sign(payload, secretWord, {expiresIn: '1h'});
    return token;
}