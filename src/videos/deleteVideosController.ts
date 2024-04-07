import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {db} from "../db/db";

export const deleteVideosController = (req: Request<{ id: string }>, res: Response) => {
    const videoById = db.videos.find(e => e.id === +req.params.id)
    if (!videoById) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json({message: 'Video not found'})
        return
    }
    db.videos = db.videos.filter(e => e.id !== +req.params.id)
    res
        .status(HTTP_STATUSES.NO_CONTENT_204)
        .json({message: 'Video deleted successfully'})
}