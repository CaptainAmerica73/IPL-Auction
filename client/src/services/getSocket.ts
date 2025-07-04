import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
      autoConnect: false,
    });
  }
  return socket;
}
