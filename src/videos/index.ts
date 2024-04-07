import {Router} from "express";
import {getVideosController} from "./getVideosController";
import {createVideoController} from "./createVideosController";
import {findVideoController} from "./findVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)