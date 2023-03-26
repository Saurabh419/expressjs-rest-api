import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./routers"

dotenv.config()

const port = process.env.PORT || 8080
const app = express()

// middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// routes setup
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "working file, good health:)",
  })
})

// user router
app.use("/api/v1/user", userRouter)

// spinning up server
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}/`)
})
