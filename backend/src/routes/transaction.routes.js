import { Router } from "express";
import { transactionValidator } from "../validator/transaction.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { addTransaction, deleteTransaction, getCategoryStats, getDashboardStats, getTransactions } from "../controllers/transaction.controller.js";
const router = Router()


router.post("/add", authUser, transactionValidator, addTransaction)
router.get("/all", authUser, getTransactions);
router.delete("/delete/:id", authUser, deleteTransaction);
router.get("/stats", authUser, getDashboardStats);

router.get("/category-stats", authUser, getCategoryStats);

export default router 