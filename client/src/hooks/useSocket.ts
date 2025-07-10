import {useEffect} from "react";
import getSocket from "../services/getSocket.ts";

export default function useSocket(isAuthenticated: boolean) {
    useEffect(() => {
        const socket = getSocket();
        if (isAuthenticated) {
            socket.connect();
        }
        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated]);
}
