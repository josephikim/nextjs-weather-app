import { Request, Response } from 'express'

import postgresService from 'db/postgres'

export default async function signupHandler(req: Request, res: Response) {
  const data = req.body
  const user = await postgresService.createUser(data)

  const result = {
    email: user.email,
  }

  res.json(result)
}
