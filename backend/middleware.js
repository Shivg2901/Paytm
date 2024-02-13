const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "You are not authorized"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Can't authorize"
        });
    }
};

const rollbackMiddleware = async (req, res, next) => {
    const transactionId = req.cookies && req.cookies.transactionId;

    if (transactionId) {
        const session = await mongoose.startSession();

        session.startTransaction();
        try {
            await session.abortTransaction();
            res.clearCookie('transactionId');
            next();
        } catch (err) {
            res.status(500).json({
                message: "Failed to rollback transaction"
            });
        } finally {
            session.endSession();
        }
    } else {
        next();
    }
};


module.exports = {
    authMiddleware,
    rollbackMiddleware
}

