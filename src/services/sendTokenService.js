import amqplib from 'amqplib';
import dotenv from'dotenv';
dotenv.config();

const url = process.env.URL_BROKER;
const exch = process.env.EXCHANGE_T;

export const sendToken = async(token) => {
    try {
        const conn = await amqplib.connect(url);
        const channel = await conn.createChannel();
        const message = await channel.publish(exch, '', Buffer.from(JSON.stringify(token)))
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}