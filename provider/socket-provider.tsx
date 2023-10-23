"use client";

import { io as ClientIo } from 'socket.io-client';
import { useState, useEffect, createContext, useContext } from 'react';

type SocketContextType = {
    socket: null | any;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIo as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false
        });

        socketInstance.on("connect", () => {
            setIsConnected(true)
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false)
        })

        setSocket(socketInstance)
        return () => {
            socketInstance.disconnect();
        }
    }, [])
    
    return (
        <SocketContext.Provider value={{ isConnected, socket }}>
            {children}
        </SocketContext.Provider>
    )
}