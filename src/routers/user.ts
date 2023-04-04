import { Router } from "express"
import { userController } from "../controllers"
import { validateUserBody } from "../middlewares/user"

const router = Router()

router.get("/all", userController.getAllUsers)
router.get("/:user_id", userController.getUserById)
router.post("/new", validateUserBody, userController.createNewUser)

export default router
