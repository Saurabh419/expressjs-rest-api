import { Request, Response } from "express"
import { IUser, User } from "../models/user"
import bcryptjs from "bcryptjs"

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const user = new User()
    const data = await user.readAll()
    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: data,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "faild to read data, internal error!",
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { user_id } = req.params

  try {
    const user = new User()
    const data = await user.readById(Number(user_id))
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "bad request, user with given id does not exists!!",
      })
    }
    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: data,
    })
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "failed to retrieved data, internal error!",
    })
  }
}

export const createNewUser = async (req: Request, res: Response) => {
  const first_name: string = req.body.first_name
  const last_name: string = req.body.last_name
  const email: string = req.body.email
  const password: string = req.body.password
  const gender: string = req.body.gender
  const birthday: string = req.body.birthday
  const admin: boolean = false
  const active: boolean = true

  try {
    const password_hash = await bcryptjs.hash(password, 10)
    const user = new User()
    const data = await user.create(<IUser>{
      first_name,
      last_name,
      password_hash,
      email,
      gender,
      birthday,
      active,
      admin,
    })
    res.status(200).json({
      success: true,
      message: "account created successfully",
      data: data,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create account, internal error:(",
    })
  }
}
