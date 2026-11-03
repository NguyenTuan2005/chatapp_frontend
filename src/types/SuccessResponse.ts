export interface SuccessResponse<T> {
    status: 'success';
    event: string;
    data: T;
}