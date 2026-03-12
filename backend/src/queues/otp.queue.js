import {Queue} from "bullmq"

const otpQueue = new Queue("otpQueue",
    {
        connection:{
            host:"127.0.0.1",
            port:6379,
        }
    }
)

export {otpQueue}