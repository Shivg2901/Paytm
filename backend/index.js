const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const rootRouter = require("./routes/index");


app.use("/api/v1", rootRouter);


app.listen(3001, () => {
    console.log("backend running on port 3001");
})






