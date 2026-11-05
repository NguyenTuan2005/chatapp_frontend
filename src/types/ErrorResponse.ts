import type {ResponseStatus} from "../config/WSEventsEnum.ts";

export interface ErrorResponse {
    status: ResponseStatus.ERROR;
    event: string;
    mes: string;
}