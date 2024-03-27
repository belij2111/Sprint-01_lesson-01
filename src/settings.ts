import {config} from 'dotenv'

config()
// console.log(process.env.PORT)
export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
    },
}