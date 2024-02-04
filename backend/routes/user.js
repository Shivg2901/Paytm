const express = require("express");
const userRouter = express.Router();

const app = express();
const zod = require("zod");
const { JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken");


app.use(cors());
app.use("/api/v1", rootRouter);
app.use(express.json());


import { authMiddleware } from "../middleware";
import { User } from "./db";


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


app.post("/api/v1/user/signup", async (req, res) => {
    const validatedSignup = signupSchema.safeParse(req.body);
    const alreadyExists = await User.find({
        username: req.body.username
    });
    if (!validatedSignup.success) {
        res.status(404).json({
            message: "Incorrect Inputs",
        })
    }
    if (!alreadyExists) {
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
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: token,
    })
})

app.get("/api/v1/user/signin", async (req, res) => {
    const validatedSignin = signinSchema.safeParse(req.body);
    if (!validatedSignin.success) {
        res.status.json({
            message: "Error while logging in"
        })
    }

    const user = await User.find({
        username: req.body.username,
        password: req.body.password,
    })

    if (!user) {
        res.status.json({
            message: "Error while logging in"
        })
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

app.put("/api/v1/user", authMiddleware, async (req, res) => {
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

app.get("/api/v1/user/bulk", (req, res) => {

})


module.exports = userRouter;

