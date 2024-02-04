const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();


app.use(cors());
app.use("/api/v1", rootRouter);
app.use(express.json());


app.listen(3000, () => {
    console.log("backend running on port 3000");
})






