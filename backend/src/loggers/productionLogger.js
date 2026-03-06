import { createLogger, transports, format } from "winston";
const { combine,colorize, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const productionLogger = ()=>{
    return createLogger({
        level: 'debug',
        format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), myFormat),
        transports: [new transports.Console()]
    })
}
export { productionLogger }