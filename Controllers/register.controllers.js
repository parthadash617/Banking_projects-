import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const register = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    dob,
    address,
    password,
    confirm_password,
  } = req.body ?? {};

  if (
    !full_name ||
    !email ||
    !phone ||
    !dob ||
    !address ||
    !password ||
    !confirm_password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO USERS (full_name, email, phone, dob, address, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, full_name, email`,
      [full_name, email.trim().toLowerCase(), phone, dob, address, passwordHash],
    );
    const user = result.rows[0];
    const token = jwt.sign(
      { sub: String(user.id), email: user.email },
      jwtSecret,
      { expiresIn: "1h" },
    );

    return res.status(201).json({
      message: "Registration successful",
      user,
      token,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email is already registered" });
    }

    console.error("Registration failed:", error);
    return res.status(500).json({ message: "Unable to register" });
  }
};
