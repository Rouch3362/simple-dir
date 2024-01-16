import { Router } from "express";
import fs from "fs"
import os from 'os'
import path from "path";
export const router = Router()


router.get("/" , (req , res) => {
    // rendering ui template
    res.render('index.ejs' , {message: req.flash("message")})
})


router.post("/create-subfolders" , (req , res) => {
    // collecting user inputs
    const { desktop , subcount , subname , parent } = req.body
    let { path: desPath } = req.body

    // make a default path for user
    if (!desPath) { 
        desPath = "c://"
    }
    // if desktop ption is on change destination path to user's desktop path
    if (desktop == "on") {
        desPath = `${os.userInfo().homedir}/desktop`
    }
    
    // make the parent folder
    fs.mkdir(path.join(desPath , parent) , (err) => {
        // if something went wrong redirect back user to home and show them the error message
        if (err) {
            req.flash("message" , err.message)
            return res.redirect("/")
        }
        // looping throw number of subfolder and making them
        for (let i = 1; i <= Number.parseInt(subcount); i++) {
            // recursive is true beacause if a folder is already exists use it and if not creates it
            fs.mkdirSync(`${desPath}/${parent}/${subname} ${i}` , {recursive: true})
        }
        // show the user success message
        req.flash("message" , "Folders Created Successfully")
        return res.redirect("/")
    })
    
})

router.post('/create-customfolders' , (req , res) => {
    // collecting user inputs
    const { desktop } = req.body
    let { path: desPath , names } = req.body 

    // if names are not entered show the user an error
    if (!names) {
        req.flash("message" , "Folder Name Field Is Required. Please Fill It")
        return res.redirect('/')
    }
    // make names an array out of string
    names = names.split(",")

    // make a default path for user
    if (!desPath) {
        desPath = "c://"
    }
    if (desktop == "on") {
        desPath = `${os.userInfo().homedir}/desktop`
    }
    
    // looping throw names and create a folder for each of them
    names.forEach((name: string) => {
        // recursive is true beacause if a folder is already exists use it and if not creates it
        fs.mkdirSync(`${desPath}/${name}`, { recursive: true })
    });
    // show the user success message
    req.flash("message" , "Folders Created Successfully")
    res.redirect("/")
})