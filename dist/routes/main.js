"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => {
    // rendering ui template
    res.render('index.ejs', { message: req.flash("message") });
});
exports.router.post("/create-subfolders", (req, res) => {
    // collecting user inputs
    const { desktop, subcount, subname, parent } = req.body;
    let { path: desPath } = req.body;
    // make a default path for user
    if (!desPath) {
        desPath = "c://";
    }
    // if desktop ption is on change destination path to user's desktop path
    if (desktop == "on") {
        desPath = `${os_1.default.userInfo().homedir}/desktop`;
    }
    // make the parent folder
    fs_1.default.mkdir(path_1.default.join(desPath, parent), (err) => {
        // if something went wrong redirect back user to home and show them the error message
        if (err) {
            req.flash("message", err.message);
            return res.redirect("/");
        }
        // looping throw number of subfolder and making them
        for (let i = 1; i <= Number.parseInt(subcount); i++) {
            // recursive is true beacause if a folder is already exists use it and if not creates it
            fs_1.default.mkdirSync(`${desPath}/${parent}/${subname} ${i}`, { recursive: true });
        }
        // show the user success message
        req.flash("message", "Folders Created Successfully");
        return res.redirect("/");
    });
});
exports.router.post('/create-customfolders', (req, res) => {
    // collecting user inputs
    const { desktop } = req.body;
    let { path: desPath, names } = req.body;
    // if names are not entered show the user an error
    if (!names) {
        req.flash("message", "Folder Name Field Is Required. Please Fill It");
        return res.redirect('/');
    }
    // make names an array out of string
    names = names.split(",");
    // make a default path for user
    if (!desPath) {
        desPath = "c://";
    }
    if (desktop == "on") {
        desPath = `${os_1.default.userInfo().homedir}/desktop`;
    }
    // looping throw names and create a folder for each of them
    names.forEach((name) => {
        // recursive is true beacause if a folder is already exists use it and if not creates it
        fs_1.default.mkdirSync(`${desPath}/${name}`, { recursive: true });
    });
    // show the user success message
    req.flash("message", "Folders Created Successfully");
    res.redirect("/");
});
