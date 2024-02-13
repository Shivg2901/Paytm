export const rollbackMiddleware = async (req, res, next) => {
    const transactionId = req.cookies.transactionId;

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

