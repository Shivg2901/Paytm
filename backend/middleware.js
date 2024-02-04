const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    const authHead = auth.split(" ");
    const token = authHead[1];

    if (!auth || !authHead.startswith("Bearer ")) {
        res.status(403).json({
            message: "Some error"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "Some error"
            })
        }
    } catch (err) {
        res.status(403).json({
            message: "Some error"
        })
    }
}

module.exports = {
    authMiddleware
}