const express = require("express");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const rootRouter = require("./routes/index");
const app = express();


app.use("/api/v1", rootRouter);


app.listen(3000, () => {
    console.log("backend running on port 3000");
})






