import { Worker } from "bullmq";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:"kanchan.nath.act@gmail.com",
        pass: "kswv ialb qgvt ntmf"
    }
});

async function sendOtpEmail(email, otp) {
    const info = await transporter.sendMail({
        from: `"OTP Service" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`,
        html: `<b>Your OTP is ${otp}</b>`
    });

    console.log("Message sent:", info.messageId);
}

const worker = new Worker(
    "otpQueue",
    async (job) => {
        const { email, otp } = job.data;

        await sendOtpEmail(email, otp);
    },
    {
        connection: {
            host: "127.0.0.1",
            port: 6379
        }
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed`, err);
});

console.log("Worker started...");