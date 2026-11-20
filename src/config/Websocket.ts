import type {WebSocketData} from "../types/WebSocketData";
import type {SuccessResponse} from "../types/SuccessResponse";
import type {ErrorResponse} from "../types/ErrorResponse";
import {ACTION_ON_CHAT, ResponseStatus} from "./WSEventsEnum.ts";

type ServerResponse = SuccessResponse<unknown> | ErrorResponse;

type Pending = {
    resolve: (data: any) => void;
    reject: (error: Error) => void;
};

class WebSocketService {
    private socket: WebSocket | null = null;
    private pending = new Map<string, Pending>();

    connect(): Promise<void> {
        if (this.socket?.readyState === WebSocket.OPEN) return Promise.resolve();

        if (!this.socket || this.socket.readyState > WebSocket.OPEN) {
            this.socket = new WebSocket(import.meta.env.VITE_CHAT_WS_URL);
            this.socket.onmessage = (e) => this.handleMessage(JSON.parse(e.data));
            this.socket.onclose = (e) => {
                if (this.socket === socket) this.socket = null;
                this.rejectAll("Socket closed");
                console.log("WS CLOSED", e.code, e.reason, e.wasClean);
            };
            this.socket.onerror = (e) => console.log("WS ERROR", e);
        }

        const socket = this.socket;
        return new Promise((resolve, reject) => {
            socket.addEventListener("open", () => resolve(), { once: true });
            socket.addEventListener("error", () => reject(new Error("Cannot connect")), { once: true });
        });
    }

    request<TResponse, TRequest = unknown>(event: string, data: TRequest): Promise<TResponse> {
        return new Promise((resolve, reject) => {
            this.pending.set(event, { resolve, reject });
            try {

                this.send({ action: ACTION_ON_CHAT, data: { event, data } });

            } catch (error) {
                this.pending.delete(event);
                reject(error);
            }
        });
    }

    send<T>(request: WebSocketData<T>) {
        if (!this.isConnected()) throw new Error("WebSocket is not connected");
        this.socket!.send(JSON.stringify(request));
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
        this.rejectAll("Disconnected");
    }

    isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    private handleMessage(response: ServerResponse) {
        console.log("WebSocket received:", response);

        if (response.event === "AUTH") return this.rejectAll("AUTH");

        let key = response.event;
        if (!this.pending.has(key) && response.status === ResponseStatus.ERROR) {
            key = this.pending.keys().next().value ?? key;
        }

        const waiting = this.pending.get(key);
        if (!waiting) return;
        this.pending.delete(key);

        if (response.status === ResponseStatus.SUCCESS) waiting.resolve(response.data);
        else waiting.reject(new Error(response.mes));
    }

    private rejectAll(reason: string) {
        const error = new Error(reason);
        this.pending.forEach((w) => w.reject(error));
        this.pending.clear();
    }
}

export const websocketService = new WebSocketService();