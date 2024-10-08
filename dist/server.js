"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(userRoutes_1.default);
app.use(contactRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
