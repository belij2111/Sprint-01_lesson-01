import {Router} from "express";
import {getVideosController} from "./getVideosController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)