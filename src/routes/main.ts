import { Router } from "express";
import fs from "fs"
import path from "path";
export const router = Router()


router.get("/" , (req , res) => {
    res.render('index.ejs' , {message: req.flash("message")})
})


router.post("/create-subfolders" , (req , res) => {
    let { path: desPath , parent , subcount , subname } = req.body
    if (!desPath) {
        desPath = "c://"
    }
    if (parent) {
        fs.mkdir(path.join(desPath , parent) , (err) => {
            if(err) {
                req.flash("message" , "Somehting Went Wrong. Try Again")
                return res.redirect("/")
            }
        })
    }
    for (let i = 1; i <= subcount; i++) {
        fs.mkdir(path.join(`${desPath}/${parent}` , `${subname} ${i}`) , (err) => {
            if (err) {
                req.flash("message" , "Somehting Went Wrong. Try Again")
                return res.redirect("/")
            }
        })
    }
})

router.post('/create-customfolders' , (req , res) => {
    let { names , path: desPath } = req.body
    if (!names) {
        req.flash("message" , "Folder Name Field Is Required. Please Fill It")
        return res.redirect('/')
    }
    names = names.split(",")
    if (!desPath) {
        desPath = "c://"
    }
    names.forEach((name: string) => {
        fs.mkdir(path.join(desPath , name) , (err) => {
            if (err) {
                req.flash("message" , "Something Went Wrong. Try Again")
                return res.redirect("/")
            }
        })
    });
})