# Sample Expressjs REST-API

This is a expressjs REST-API with MySql database.

## :pushpin: Packages

A shortened list of the Node modules used in this app:

- [express](https://www.npmjs.com/package/express)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [typescript](https://www.npmjs.com/package/typescript)

## :computer: Setup

### Requirements:

- [MySQL](https://www.mysql.com/de/)
- [Node.js](https://nodejs.org/en/)

Installation:

1. Run `npm install`
2. Rename `.env.example` to `.env` and enter environment variables
3. Run `npm run build` to compile the TS code
4. Run `npm start` to start the application

### Routes

#### basic
- `GET /health` check health(status).

#### user
- `GET /api/v1/user/all` get all register user
- `GET /api/v1/user/:user_id` get user by user_id
- `GET /api/v1/user/:user_id` get user by user_id
- `POST /api/v1/user/new` create new user
- `PUT /api/v1/user/:user_id` update user by user_id

*user post data*
`
{
    first_name: string,
    last_name: string,
    email: string(unique),
    password: string,
    gender: 'male'|'female'|'others',
    birthday: 'dd-mm-yyyy'
}
`

## Thanks for Visiting
