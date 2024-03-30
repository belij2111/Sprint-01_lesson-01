import {req} from "./test-helpers";
import {HTTP_STATUSES, SETTINGS} from "../src/settings";

describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })
    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200)
        console.log(res.body)
    });
})
