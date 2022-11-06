import { Request, Response } from 'express'

import postgresService from 'db/postgres'

export default async function handler(req: Request, res: Response) {
  const data = req.body
  const newUser = await postgresService.createUser(data)

  const result = {
    id: newUser.id,
    email: newUser.email,
  }

  res.json(result)
}
