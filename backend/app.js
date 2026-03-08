import express, {Router} from "express"
import cors from "cors"
import client from 'prom-client';

const app = express()

const collectDefaultMetrics = client.collectDefaultMetrics

collectDefaultMetrics({
    register: client.register
})

app.get("/metrics", async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})



app.use(cors())
app.use(express.json({ limit: "1600kb" }))
app.use(express.urlencoded({extended:true, limit: "1600kb"}))

app.get("/", (req, res) => {
    res.send("Server working");
});

import userRouter from "./src/routes/user.route.js"

app.use(`/api/v1/users`, userRouter)

export {app}