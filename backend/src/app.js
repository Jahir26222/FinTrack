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

const allowedOrigins = [
  'http://localhost:5173', // Local frontend (Vite)
  'https://fintrack-lxsb.onrender.com' // Aapka Render URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy doesn\'t allow access'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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