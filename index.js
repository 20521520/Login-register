const express = require("express");
const cors = require("cors");
const dotevn = require("dotenv");
const mongoose = require("mongoose");
const cookieParse = require("cookie-parser");
const authRouter = require("./Route/auth");


const app = express();

mongoose.connect("process.env.MONGODB_URL",()=>{
    console.log("Connect");
}
)

app.use(cors());
app.use(cookieParse());
app.use(express.json());

//Route
app.use("/v1/auth", authRouter );


app.listen(8000, () => {
    console.log("Server is running");
});