import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {db} from "../db/db";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {VideoDBType} from "../db/video-db-type";
import {generateUniqueID, timeInMs} from "../helpers";

const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessage: []
    }
    if (typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessage.push({
            message: 'error!!!', field: 'title'
        })
    }
    if (typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessage.push({
            message: 'error!!!', field: 'author'
        })
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessage.push({
            message: "error!!!", field: 'availableResolutions'
        })
    }
    return errors
}

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
}
//
// export type QyeryType = {
//     search?: string
// }
//
// export const someController = (reg: Request<ParamType, any, BodyType, QyeryType>, res: Response<void | OutputErrorsType>) => {
// }

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessage.length) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors)
        return
    }

    const newVideo: VideoDBType = {
        ...req.body,
        id: generateUniqueID(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date(Date.now()).toISOString(),
        publicationDate: new Date(timeInMs()).toISOString(),
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newVideo)
}