import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {OutputVideoType} from "../input-output-types/video-types";
import {db} from "../db/db";

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    res
        .status(HTTP_STATUSES.OK_200)
        .json(db.videos)
}