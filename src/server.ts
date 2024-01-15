import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import {router} from './routes/main'
import flash from 'connect-flash';
import session from 'express-session';
const port = process.env['PORT'] || 3000

const app = express()


app.set("view engine" , 'ejs')
app.use(bodyParser.urlencoded({extended: false}))


// setup express-session
app.use(
    session({
      secret: process.env['SESSION_SECRET'],
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    })
  );


// setup flash
app.use(flash())
app.use("" , router)


app.listen(port , () => console.log(`Server Is Listening On Port ${port}`))
