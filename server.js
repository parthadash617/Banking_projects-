import express from  "express";
import dotenv from  "dotenv";
import router from "./Routers/register.router.js";
import pool from "./config/db.js";
const app = express();

app.use(express.json());
app.use("/api",router)

dotenv.config();


app.get("/app",(req,res)=>{
   res.send("hyyy bro")
})

const db=async()=>{
   try{
        await pool.query("SELECT 1");
        console.log("PostgreSQL connected successfully");

   }catch(error){
      console.error("Database connection failed:", error.message);
   }
}
db()


const port=process.env.PORT
app.listen(port,()=>{
console.log("servering conneted")
})

 
