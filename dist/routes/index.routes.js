"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controller/index.controller"));
const indexRoutes = (0, express_1.Router)();
indexRoutes.route('/')
    .get(index_controller_1.default);
exports.default = indexRoutes;
