import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js"
import transactionRouter from "./routes/transaction.routes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"]

}))

//Auth routes
app.use("/api/auth", authRouter)
app.use("/api/transaction", transactionRouter)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app