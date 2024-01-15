"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env['PORT'] || 3000;
const app = (0, express_1.default)();
app.set("view engine", 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Server Is Listening On Port ${port}`));
