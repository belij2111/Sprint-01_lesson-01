import cors from 'cors'
import express from 'express'
import {SETTINGS} from "./settings";
import {videosRouter} from "./input-output-types/videos";

export const app = express()
app.use(express.json())
app.use(cors())

app.use(SETTINGS.PATH.VIDEOS, videosRouter)

// app.delete('/testing/all-data',(req, res)=>{
//
// })
