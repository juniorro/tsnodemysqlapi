"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getIndexRoutes = (req, res) => res.status(200).json({ message: 'Welcome to the Patients API' });
exports.default = getIndexRoutes;
