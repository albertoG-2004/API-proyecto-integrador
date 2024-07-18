import io from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

export const sendData = async(data) => {
    const socket = io(process.env.SOCKET_SERVER);
    const client = process.env.CLIENT;

    socket.on("connect", ()=>{
        console.log("Connected to server");
        socket.emit(client, data);
    });

    socket.on("disconnect", ()=>{
        console.log("Disconnect to server");
    })
}