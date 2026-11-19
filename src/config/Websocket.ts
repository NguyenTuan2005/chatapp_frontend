import type {WebSocketData} from "../types/WebSocketData";
import type {SuccessResponse} from "../types/SuccessResponse";
import type {ErrorResponse} from "../types/ErrorResponse";
import {ACTION_ON_CHAT, ResponseStatus} from "./WSEventsEnum.ts";

type ServerResponse = SuccessResponse<unknown> | ErrorResponse;

type Pending = {
    resolve: (data: any) => void;
    reject: (error: Error) => void;
};

type EventListener = (data: unknown) => void;


class WebSocketService {
    private socket: WebSocket | null = null;
    private pending = new Map<string, Pending>();
    private listeners = new Map<string, Set<EventListener>>();

    connect(): Promise<void> {
        if (this.socket?.readyState === WebSocket.OPEN) return Promise.resolve();

        if (!this.socket || this.socket.readyState > WebSocket.OPEN) {
            this.socket = new WebSocket(import.meta.env.VITE_CHAT_WS_URL);
            this.socket.onmessage = (e) => this.handleMessage(JSON.parse(e.data));
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
    }

    isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    subscribe(event: string, callback: EventListener): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event)!.add(callback);

        return () => {
            this.listeners.get(event)?.delete(callback);

            if (this.listeners.get(event)?.size === 0) {
                this.listeners.delete(event);
            }
        };
    }

    private handleMessage(response: ServerResponse) {
        console.log("WebSocket received:", response);

        if (response.event === "AUTH") {
            const error = new Error(response.event);

            this.pending.forEach((waiting) => {
                waiting.reject(error);
            });

            this.pending.clear();
            return;
        }

        const waiting = this.pending.get(response.event);

        if (waiting) {
            this.pending.delete(response.event);

            if (response.status === ResponseStatus.SUCCESS) {
                waiting.resolve(response.data);
            } else {
                waiting.reject(new Error(response.mes));
            }

            return;
        }

        if (response.status === ResponseStatus.SUCCESS) {
            this.notifyListeners(response.event, response.data);
        }
    }

    private notifyListeners(event: string, data: unknown) {
        const callbacks = this.listeners.get(event);

        callbacks?.forEach(callback => {
            callback(data);
        });
    }
}

export const websocketService = new WebSocketService();