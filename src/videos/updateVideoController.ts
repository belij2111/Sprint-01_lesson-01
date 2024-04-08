import {Request, Response} from "express";
import {OutputVideoType, Resolutions, UpdateVideoType} from "../input-output-types/video-types";
import {db} from "../db/db";
import {HTTP_STATUSES} from "../settings";
import {OutputErrorsType} from "../input-output-types/output-errors-type";

const inputValidation = (video: UpdateVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    if (typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'title'
        })
    }
    if (typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'author'
        })
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: "error!!!", field: 'availableResolutions'
        })
    }
    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: "error!!!", field: "canBeDownloaded"
        })
    }
    if (typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction < 1 || video.minAgeRestriction > 18) {
        errors.errorsMessages.push({
            message: "error!!!", field: "minAgeRestriction"
        })
    }
    if (typeof video.publicationDate !== 'string') {
        errors.errorsMessages.push({
            message: "error!!!", field: "publicationDate"
        })
    }
    return errors
}

export const updateVideoController = (req: Request<{
    id: string
}, any, UpdateVideoType>, res: Response<OutputVideoType | {}>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors)
        return
    }
    const updateVideo = db.videos.find(e => e.id === +req.params.id)
    if (!updateVideo) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json({})
        return;
    }

    updateVideo.title = req.body.title
    updateVideo.author = req.body.author
    updateVideo.availableResolutions = req.body.availableResolutions
    updateVideo.canBeDownloaded = req.body.canBeDownloaded
    updateVideo.minAgeRestriction = req.body.minAgeRestriction as any
    updateVideo.publicationDate = req.body.publicationDate

    res
        .status(HTTP_STATUSES.NO_CONTENT_204)
        .json({message: "successfully updated"})
}