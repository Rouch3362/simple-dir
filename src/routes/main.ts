import { Router } from "express";
import fs from "fs"
import path from "path";
export const router = Router()


router.get("" , (req , res) => {
    res.render('index.ejs')
})


router.post("/create-subfolders" , (req , res) => {
    let { path: desPath , parent , subcount , subname } = req.body
    if (!desPath) {
        desPath = "c://"
    }
    if (parent) {
        fs.mkdir(path.join(desPath , parent) , (err) => {
            if(err) {
                console.log(err)
            }
        })
    }
    for (let i = 1; i <= subcount; i++) {
        fs.mkdir(path.join(`${desPath}/${parent}` , `${subname} ${i}`) , (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
})

router.post('/create-customfolders' , (req , res) => {
    let { names , path: desPath } = req.body
    if (!names) {
        return
    }
    names = names.split(",")
    if (!desPath) {
        desPath = "c://"
    }
    names.forEach(name => {
        fs.mkdir(path.join(desPath , name) , (err) => {
            if (err) {
                console.log(err)
            }
        })
    });
})