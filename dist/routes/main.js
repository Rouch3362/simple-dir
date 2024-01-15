"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => {
    res.render('index.ejs');
});
exports.router.post("/create-subfolders", (req, res) => {
    let { path: desPath, parent, subcount, subname } = req.body;
    if (!desPath) {
        desPath = "c://";
    }
    if (parent) {
        fs_1.default.mkdir(path_1.default.join(desPath, parent), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    for (let i = 1; i <= subcount; i++) {
        fs_1.default.mkdir(path_1.default.join(`${desPath}/${parent}`, `${subname} ${i}`), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});
exports.router.post('/create-customfolders', (req, res) => {
    let { names, path: desPath } = req.body;
    if (!names) {
        return;
    }
    names = names.split(",");
    if (!desPath) {
        desPath = "c://";
    }
    names.forEach(name => {
        fs_1.default.mkdir(path_1.default.join(desPath, name), (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});
