import {Request, Response} from "express";
import {OutputVideoType} from "../input-output-types/video-types";
import {db} from "../db/db";
import {HTTP_STATUSES} from "../settings";

export const findVideoController = (req: Request<{ id: string }>, res: Response<OutputVideoType | {}>) => {
    const videoById = db.videos.find(e => e.id === +req.params.id)
    if (!videoById) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json({})
        return
    }
    res
        .status(HTTP_STATUSES.OK_200)
        .json(videoById)
}