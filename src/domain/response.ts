import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";

export class HttpResponse {
    constructor(private statusCode: Code, private httpStatus: Status, private message: string, private data?: {}) {
        new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
    }
}

