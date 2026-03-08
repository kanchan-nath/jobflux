import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

import { app } from "./app.js";
import { connectDB } from "./src/configs/db/index.js";
import { logger } from "./src/loggers/logger.js";

connectDB()
    .then(() => {
        app.listen(3000, () => {
            logger.info(`Server is running at port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`MongoDB connection failed`);
    });