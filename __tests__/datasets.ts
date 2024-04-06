import {VideoDBType} from "../src/db/video-db-type";
import {Resolutions} from "../src/input-output-types/video-types";
import {DBType} from "../src/db/db";

const timeInMs = Date.now() + 1000*60*60*24

export const video1: VideoDBType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date(Date.now()).toISOString(),
    publicationDate: new Date(timeInMs).toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const dataset1: DBType = {
    videos: [video1]
}