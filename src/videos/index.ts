import {Router} from "express";
import {getVideosController} from "./getVideosController";
import {createVideoController} from "./createVideosController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)