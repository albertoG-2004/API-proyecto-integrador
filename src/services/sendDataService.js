import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const socket = io(process.env.SOCKET_SERVER);

export const sendDataBananas = (data) => {
  socket.emit("bananas", data);
};

export const sendDataMonitorings = (data) => {
  socket.emit("monitorings", data);
};