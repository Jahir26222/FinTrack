import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    transactionCategory: {
        type: String,
        required: true,
        default: 'Others',
    },
    description: { type: String },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });


const transactionModel = mongoose.model("transaction", transactionSchema)

export default transactionModel