import { Request, Response } from 'express'

export default async function handler(req: Request, res: Response) {
  const data = req.body

  const newUser = {
    id: 1234,
    email: data.email,
  }

  res.json(newUser)
}
