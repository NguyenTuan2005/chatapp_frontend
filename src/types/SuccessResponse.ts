import type {ResponseStatus} from "../config/WSEventsEnum.ts";

export interface SuccessResponse<T> {
    status: ResponseStatus.SUCCESS;
    event: string;
    data: T;
}