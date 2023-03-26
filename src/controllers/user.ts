import { Request, Response } from "express"
import bcryptjs from "bcryptjs"
import { userModel } from "../models"
import { IUser } from "../types"

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const user = new userModel.User()
    const userData = await user.readAll()

    const data = userData.map((item) => {
      return {
        user_id: item.user_id,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        birthday: item.birthday,
        gender: item.gender,
        admin: item.admin,
        active: item.active,
        create_at: item.created_at,
        updated_at: item.updated_at,
      }
    })

    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: [data],
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
    const user = new userModel.User()
    const userData = await user.readById(Number(user_id))

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "bad request, user with given id does not exists!!",
      })
    }
    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: [
        {
          user_id: userData.user_id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          birthday: userData.birthday,
          gender: userData.gender,
          admin: userData.admin,
          active: userData.active,
          create_at: userData.created_at,
          updated_at: userData.updated_at,
        },
      ],
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
    const user = new userModel.User()
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
