const express = require("express");
const router = express.Router();

const zod = require("zod");
const { JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken");

const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { User } = require("../db");



const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
})


router.post("/signup", async (req, res) => {
    const validatedSignup = signupSchema.safeParse(req.body);

    if (!validatedSignup.success) {
        res.status(404).json({
            message: "Incorrect Inputs",
        })
    }
    const alreadyExists = await User.find({
        username: req.body.username
    });

    if (alreadyExists) {
        res.status(404).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000,
    })

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: token,
    })
})

router.post("/signin", async (req, res) => {
    const validatedSignin = signinSchema.safeParse(req.body);
    if (!validatedSignin.success) {
        res.status.json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if (!user) {
        res.status.json({
            message: "Error while logging in"
        })
        return;
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        token: token,
    })
    return;
})

const updatedUserSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional(),
}).refine((data) => {
    return data.firstName !== undefined || data.lastName !== undefined || data.password !== undefined;
}, {
    message: "Atleast one field is required",
})

router.put("/", authMiddleware, async (req, res) => {
    const validatedUpdatedUser = updatedUserSchema.safeParse(req.body);
    if (!validatedUpdatedUser.success) {
        res.json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.status(200).json({
        message: "Updated successfully"
    })

})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { $regex: filter } },
            { lastName: { $regex: filter } }
        ]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: users.firstName,
            lastName: users.lastName,
            id: users._id
        }))
    });
})

module.exports = router;

