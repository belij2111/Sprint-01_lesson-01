import cors from 'cors'
import express from 'express'
import {HTTP_STATUSES, SETTINGS} from "./settings";
import {setDB} from "./db/db";

export const app = express()
app.use(express.json())
app.use(cors())

app.get(SETTINGS.PATH.VIDEOS, (req, res) => {
    res.status(HTTP_STATUSES.OK_200).json({test: 'Ok'})
})

// app.delete('/testing/all-data',(req, res)=>{
//     setDB()
// })
