import { Request, Response } from 'express'

import postgresService from 'db/postgres'

export default async function handler(req: Request, res: Response) {
  const data = req.body
  const user = await postgresService.createUser(data)

  const result = {
    id: user.id,
    email: user.email,
  }

  res.json(result)
}
