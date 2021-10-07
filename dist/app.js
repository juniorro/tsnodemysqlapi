"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
class App {
    constructor(port = 3000 || process.env.SERVER_PORT) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.middleWare();
        this.routes();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port);
            console.info(`Application is running on port ${this.port}`);
        });
    }
    middleWare() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/', index_routes_1.default);
        this.app.use('/patients', patient_routes_1.default);
    }
}
exports.App = App;
