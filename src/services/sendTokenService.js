import amqplib from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL_BROKER;
const exch = process.env.EXCHANGE_T;

export const sendToken = async(token) => {
    try {
        const conn = await amqplib.connect(url);
        const channel = await conn.createChannel();
        await channel.assertExchange(exch, 'direct', { durable: true });
        const message = await channel.publish(exch, '', Buffer.from(JSON.stringify(token)));
        console.log('Token published:', message);
        await channel.close();
        await conn.close();
    } catch (error) {
        console.log('Error publishing token:', error);
    }
};