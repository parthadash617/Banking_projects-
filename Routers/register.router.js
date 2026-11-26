import express from "express";

import { register } from "../Controllers/register.controllers.js";
 const router=express.Router();




router.post("/register", register)
export default router
