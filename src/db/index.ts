import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()

export const connection = mysql2.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
})
