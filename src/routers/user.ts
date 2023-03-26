import { Router } from "express"
import { userController } from "../controllers"

const router = Router()

router.get("/all", userController.getAllUsers)
router.get("/:user_id", userController.getUserById)
router.post("/new", userController.createNewUser)

export default router
