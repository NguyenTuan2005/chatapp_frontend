import type { WebSocketData } from "../types/WebSocketData";

class WebSocketService {
    private socket: WebSocket | null = null;

    connect() {
        if (
            this.socket?.readyState === WebSocket.OPEN ||
            this.socket?.readyState === WebSocket.CONNECTING
        ) {
            return;
        }

        this.socket = new WebSocket(
            import.meta.env.VITE_CHAT_WS_URL
        );

        this.socket.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socket.onmessage = (event) => {
            console.log("Server response:", JSON.parse(event.data));
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected");
        };
    }

    send<T>(request: WebSocketData<T>) {
        if (this.socket?.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        this.socket.send(JSON.stringify(request));
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
    }

    isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }
}

export const websocketService = new WebSocketService();