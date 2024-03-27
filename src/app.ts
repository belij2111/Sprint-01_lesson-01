import cors from 'cors'
import express from 'express'
import {SETTINGS} from "./settings";

export const app = express()
app.use(express.json())
app.use(cors())

app.get(SETTINGS.PATH.VIDEOS, (req, res) => {
    res.status(200).json({test:'Ok'})
})
