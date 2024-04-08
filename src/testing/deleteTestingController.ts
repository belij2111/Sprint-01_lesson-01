import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {db} from "../db/db";

export const deleteTestingController = (req:Request,res:Response)=>{
    db.videos=[]
    res
        .status(HTTP_STATUSES.NO_CONTENT_204)
        .json({message:'Attention the database has been cleared'})
}