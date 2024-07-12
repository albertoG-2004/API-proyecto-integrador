import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS); 
export const encryptPassword = async(password) => {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

export const authPassword = (word, password) => {
    const auth = bcrypt.compareSync(word, password);
    return auth;
}
