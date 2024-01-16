"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const main_1 = require("./routes/main");
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const port = process.env['PORT'] || 3000;
const app = (0, express_1.default)();
// setup view engine (ejs)
app.set("view engine", 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: false }));
// setup express-session
const sessionSecret = process.env["SESSION_SECRET"];
app.use((0, express_session_1.default)({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
}));
// setup flash
app.use((0, connect_flash_1.default)());
app.use("", main_1.router);
app.listen(port, () => console.log(`Server Is Listening On Port ${port}`));
