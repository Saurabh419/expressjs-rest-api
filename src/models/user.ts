import { OkPacket } from "mysql2"
import { connection } from "../db"
import { TUser } from "../types"

export class User {
  readAll(): Promise<TUser[]> {
    return new Promise((resolve, reject) => {
      connection.query<TUser[]>("select * from users;", (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  readById(user_id: number): Promise<TUser | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<TUser[]>(
        "select * from users where user_id = ?;",
        [user_id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  create(user: TUser): Promise<TUser> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users 
      (first_name, last_name, email, 
      password_hash, birthday, gender, admin, 
      active, created_at, updated_at) 
      VALUES (?,?,?,?,?,?,?,?,?,?)`

      connection.query<OkPacket>(
        query,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.password_hash,
          user.birthday,
          user.gender,
          user.admin,
          user.active,
          Date.now(),
          Date.now(),
        ],
        (err, res) => {
          if (err) reject(err)
          else {
            this.readById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject)
          }
        }
      )
    })
  }

  udpate(user: TUser): Promise<TUser | undefined> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET 
        first_name = ?, last_name = ?, email = ?, 
        password_hash = ?, birthday = ?, gender = ?, 
        active = ?, admin = ?, updated_at = ? WHERE user_id = ?`

      connection.query<OkPacket>(
        query,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.password_hash,
          user.birthday,
          user.gender,
          user.active,
          user.admin,
          Date.now(),
          user.user_id!,
        ],
        (err, res) => {
          if (err) reject(err)
          else {
            this.readById(res.insertId)
              .then((user) => resolve(user))
              .catch(reject)
          }
        }
      )
    })
  }

  remove(user_id: number): Promise<number> {
    const query = "DELETE FROM users WHERE user_id = ?;"
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(query, [user_id], (err, res) => {
        if (err) reject(err)
        else resolve(res.affectedRows)
      })
    })
  }
}
