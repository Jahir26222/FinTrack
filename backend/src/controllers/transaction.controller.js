import transactionModel from "../model/transaction.model.js";


export async function addTransaction(req, res) {

    try {
        const { title, amount, transactionType, transactionCategory, description, date } = req.body;

        if (!title || !amount || !transactionType) {
            return res.status(400).json({ message: "Mandatory fields are missing" });
        }

        const userId = req.user.id

        const newTransaction = await transactionModel.create({
            title,
            amount,
            transactionType,
            transactionCategory,
            description,
            date: date || Date.now(),
            user: userId

        })


        res.status(201).json({
            message: "Transaction added successfully",
            success: true,
            data: newTransaction
        });






    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });

    }
}

export async function getTransactions(req, res) {
    try {
        const userId = req.user.id;

        // Frontend se query parameters lena (e.g. /all?type=expense)
        const { type, category } = req.query;

        // Filter object banana
        let filter = { user: userId };

        // Agar user ne type ya category bheji hai toh filter mein add karo
        if (type) filter.transactionType = type;
        if (category) filter.transactionCategory = category;

        const transactions = await transactionModel.find(filter).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function deleteTransaction(req, res) {

    try {

        const deletedTransaction = await transactionModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        res.status(200).json({
            message: "Transaction deleted successful",
            success: true,
            data: deletedTransaction
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}



export async function getDashboardStats(req, res) {
    try {
        const userId = req.user.id;

        const stats = await transactionModel.aggregate([
            // Step 1: Sirf logged-in user ke transactions filter karo
            { $match: { user: new mongoose.Types.ObjectId(userId) } },

            // Step 2: Income aur Expense ke basis par group karke sum nikalo
            {
                $group: {
                    _id: "$transactionType",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        // Data ko readable format mein convert karna
        const report = {
            totalIncome: 0,
            totalExpense: 0,
            balance: 0
        };

        stats.forEach(item => {
            if (item._id === 'income') report.totalIncome = item.totalAmount;
            if (item._id === 'expense') report.totalExpense = item.totalAmount;
        });

        report.balance = report.totalIncome - report.totalExpense;

        res.status(200).json({
            message:"Report fetched successful",
            success: true,
            data: report
        });

    } catch (error) {
        res.status(500).json({ message: "Analytics Error", error: error.message });
    }
}



import mongoose from "mongoose";

export async function getCategoryStats(req, res) {
    try {
        const userId = req.user.id;

        const categoryStats = await transactionModel.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(userId), 
                    transactionType: 'expense' // Sirf kharche ka data
                } 
            },
            {
                $group: {
                    _id: "$transactionCategory", // Category ke hisab se group karo
                    totalAmount: { $sum: "$amount" } // Har category ka total sum nikalo
                }
            },
            { $sort: { totalAmount: -1 } } // Zyada kharche wali category sabse upar
        ]);

        res.status(200).json({
            success: true,
            data: categoryStats
        });

    } catch (error) {
        res.status(500).json({ message: "Graph Data Error", error: error.message });
    }
}