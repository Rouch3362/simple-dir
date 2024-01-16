import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import {router} from './routes/main'
import flash from 'connect-flash';
import session from 'express-session';
const port = process.env['PORT'] || 3000

const app = express()

// setup view engine (ejs)
app.set("view engine" , 'ejs')
app.use(bodyParser.urlencoded({extended: false}))


// setup express-session
const sessionSecret: any = process.env["SESSION_SECRET"]
app.use(
    session({
      secret: sessionSecret,
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
