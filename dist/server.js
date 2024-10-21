"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const App = (0, express_1.default)();
const port = 3000;
App.use(express_1.default.json());
App.use(userRoutes_1.default);
App.use(contactRoutes_1.default);
App.use(errorHandler_1.errorHandler);
const app = App.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
