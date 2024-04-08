import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {db} from "../db/db";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {VideoDBType} from "../db/video-db-type";
import {dayInMs, generateUniqueID, timeInMs} from "../helpers";

const inputValidation = (video: InputVideoType) => {
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
    if (errors.errorsMessages.length) {
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
        createdAt: new Date(timeInMs()).toISOString(),
        publicationDate: new Date(timeInMs()+dayInMs()).toISOString(),
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newVideo)
}