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
    res.render('index.ejs', { message: req.flash("message") });
});
exports.router.post("/create-subfolders", (req, res) => {
    let { path: desPath, parent, subcount, subname } = req.body;
    if (!desPath) {
        desPath = "c://";
    }
    if (parent) {
        fs_1.default.mkdir(path_1.default.join(desPath, parent), (err) => {
            if (err) {
                req.flash("message", "Somehting Went Wrong. Try Again");
                return res.redirect("/");
            }
        });
    }
    for (let i = 1; i <= subcount; i++) {
        fs_1.default.mkdir(path_1.default.join(`${desPath}/${parent}`, `${subname} ${i}`), (err) => {
            if (err) {
                req.flash("message", "Somehting Went Wrong. Try Again");
                return res.redirect("/");
            }
        });
    }
});
exports.router.post('/create-customfolders', (req, res) => {
    let { names, path: desPath } = req.body;
    if (!names) {
        req.flash("message", "Folder Name Field Is Required. Please Fill It");
        return res.redirect('/');
    }
    names = names.split(",");
    if (!desPath) {
        desPath = "c://";
    }
    names.forEach((name) => {
        fs_1.default.mkdir(path_1.default.join(desPath, name), (err) => {
            if (err) {
                req.flash("message", "Something Went Wrong. Try Again");
                return res.redirect("/");
            }
        });
    });
});
