
import {Client, type IMessage, type StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = import.meta.env.VITE_CHAT_WS_URL;

class WebSocketService {
    private client: Client | null = null;

    connect(
        onConnected?: () => void,
        onError?: (error: unknown) => void
    ) {
        if (this.client?.active) return;

        this.client = new Client({
            webSocketFactory: () => new SockJS(WS_URL),

            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            onConnect: () => {
                console.log('WebSocket connected');
                onConnected?.();
            },

            onDisconnect: () => {
                console.log('WebSocket disconnected');
            },

            onStompError: (frame) => {
                console.error('STOMP error:', frame.headers['message']);
                onError?.(frame);
            },

            onWebSocketError: (error) => {
                console.error('WebSocket error:', error);
                onError?.(error);
            },

            debug: (message) => console.log('STOMP:', message),
        });

        this.client.activate();
    }

    subscribe(
        destination: string,
        callback: (message: IMessage) => void
    ): StompSubscription | null {
        if (!this.client?.connected) {
            console.warn('WebSocket is not connected');
            return null;
        }

        return this.client.subscribe(destination, callback);
    }

    send(destination: string, body: unknown) {
        if (!this.client?.connected) {
            console.warn('WebSocket is not connected');
            return;
        }

        this.client.publish({
            destination,
            body: JSON.stringify(body),
        });
    }

    disconnect() {
        if (this.client) {
            void this.client.deactivate();
            this.client = null;
        }
    }

    isConnected(): boolean {
        return this.client?.connected ?? false;
    }
}

const websocketService = new WebSocketService();

export default websocketService;
