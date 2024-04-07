import {VideoDBType} from "../src/db/video-db-type";
import {Resolutions} from "../src/input-output-types/video-types";
import {DBType} from "../src/db/db";
import {dayInMs, generateUniqueID, timeInMs} from "../src/helpers";

export const video1: VideoDBType = {
    id: generateUniqueID(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date(timeInMs()).toISOString(),
    publicationDate: new Date(timeInMs() + dayInMs()).toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const dataset1: DBType = {
    videos: [video1]
}