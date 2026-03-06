import {devLogger} from "./devLogger.js"
import {productionLogger} from "./productionLogger.js"

let logger = null

if (process.env.NODE_ENV === 'development') {
    logger = devLogger()
}

if (process.env.NODE_ENV === 'production') {
    logger = productionLogger()
}

export {logger}