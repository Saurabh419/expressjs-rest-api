import { RowDataPacket } from "mysql2"

export interface TUser extends RowDataPacket {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  password_hash: string
  birthday: string
  gender: string
  active: boolean
  admin: boolean
  created_at?: number
  updated_at?: number
}
