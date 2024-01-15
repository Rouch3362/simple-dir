import fs from 'fs'
import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
const port = process.env['PORT'] || 3000

const app = express()

app.set("view engine" , 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.listen(port , () => console.log(`Server Is Listening On Port ${port}`))
