import { NextFunction, Request, Response } from "express"
import Joi from "joi"

export const validateUserBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    first_name: Joi.string().pattern(new RegExp("^[a-z]{1,15}$")).required(),
    last_name: Joi.string().pattern(new RegExp("^[a-z]{1,15}$")).required(),
    emaiL: Joi.string().email().required(),
    password: Joi.string().required(),
    repeat_password: Joi.ref("password"),
    gender: Joi.string().valid("male", "female", "others").required(),
    birthday: Joi.string()
      // .pattern(new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{4}$"))
      .isoDate()
      .required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: "bad request",
      error: error,
    })
  }

  if (req.body.password !== req.body.repeat_password) {
    return res.status(400).json({
      success: false,
      message: "bad request",
      error: error,
    })
  }

  return res.status(200).json({
    success: true,
    message: "working on it",
    data: req.body,
  })
}
