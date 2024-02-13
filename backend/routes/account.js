const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const uuid = require('uuid/v4');
const { rollbackMiddleware } = require("../rollbackMiddleware");
const router = express.Router();

router.use(rollbackMiddleware);

router.get("/balance", authMiddleware, async (req, res) => {
    const id = req.userId;
    try {
        const person = await Account.findOne({
            userId: id
        })
        const balance = person.balance;
        res.status(200).json({
            balance: balance
        });
    } catch (err) {
        res.status(404).json({
            message: "User not found"
        })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const transactionId = req.cookies.transactionId || uuid();

    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { to, amount } = req.body;

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (account.balance < amount) {
            await session.abortTransaction();
            return res.status(403).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Invalid Account"
            });
        }

        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);

        await session.commitTransaction();
        res.cookie('transactionId', transactionId);
        res.status(200).json({
            message: "Transaction Successful"
        });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transaction aborted"
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;