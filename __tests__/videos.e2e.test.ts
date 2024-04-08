import {req} from "./test-helpers";
import {HTTP_STATUSES, SETTINGS} from "../src/settings";
import {setDB} from "../src/db/db";
import {dataset1} from "./datasets";
import {InputVideoType, Resolutions} from "../src/input-output-types/video-types";

describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it(`should get empty array`, async () => {
        setDB()
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200)
        console.log(res.body)
        expect(res.body.length).toBe(0)
    });

    it(`should get not empty array`, async () => {
        setDB(dataset1)
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200)
        console.log(res.body)
        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])

    });

    it(`should create new video`, async () => {
        setDB()
        const newVideo: InputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(HTTP_STATUSES.CREATED_201)
        console.log(res.body)
        expect(res.body.title).toBe(newVideo.title)
        expect(res.body.author).toBe(newVideo.author)
        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    });

    it(`shouldn't create new video with incorrect input data `, async () => {
        setDB()
        const invalidVideo: InputVideoType = {
            title: "t",
            author: "a",
            availableResolutions: "invalid" as any
        }
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(invalidVideo)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
        console.log(res.body)
        expect(res.body.availableResolutions).not.toEqual(invalidVideo.availableResolutions)
        expect(res.body.errorsMessage[0].field).toBe('availableResolutions')
    });

    it(`should return video by id`, async () => {
        setDB(dataset1)
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .expect(HTTP_STATUSES.OK_200)
        console.log(res.body)
        expect(res.body).toEqual(dataset1.videos[0])
    });

    it(`shouldn't return video by id`, async () => {
        setDB(dataset1)
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/-100')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
        console.log(res.body)
    });

    it(`should delete video by id`, async () => {
        setDB(dataset1)
        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        console.log(res.body)
    });

    it(`shouldn't delete video by id`, async () => {
        setDB(dataset1)
        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/-100')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
        console.log(res.body)
    });
})
