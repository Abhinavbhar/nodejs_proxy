import e, { json } from "express";
import dotenv from "dotenv";
import addIp from './Routes/addIp.js'
import signup from "./Routes/signup.js";
import connectDB from "./Db/mongo.js";
import login from "./Routes/login.js";
import changePassword from "./Routes/changePassword.js";
import checkLogin from "./MiddleWare/jwt.js";
import check from "./Routes/checkLogin.js";
connectDB()
dotenv.config()
const app = e()
app.use(json())
app.use("/api/main/",checkLogin)
app.get("/api/main/checklogin",check)

app.post("/api/main/addip",addIp)
app.post("/api/signup",signup)
app.post("/api/login",login)
app.post("/api/changePassword",changePassword)
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})