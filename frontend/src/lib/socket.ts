import { io, type Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

function getSocketBaseUrl() {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!apiUrl) {
    return window.location.origin;
  }

  return apiUrl.replace(/\/api\/?$/, "");
}

export function getSocketClient() {
  if (!socketInstance) {
    socketInstance = io(getSocketBaseUrl(), {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: false,
    });
  }

  return socketInstance;
}
