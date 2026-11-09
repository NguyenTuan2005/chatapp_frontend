
export interface LoginRequest {
    data: {
        user: string;
        pass: string;
    };
}

export interface ReLoginRequest {
    data: {
        user: string;
        code: string;
    }
}