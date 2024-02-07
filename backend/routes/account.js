const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

module.exports = router;

router.get("/balance", authMiddleware, async (req, res) => {
    const id = req.userId;
    try {
        const person = await Account.findOne({
            _id: id
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

