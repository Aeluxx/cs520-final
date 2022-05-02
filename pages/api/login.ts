import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import user from '../../models/user'
import connectDB from '../../middleware/connectDb'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  try {
    const { email, password } = req.body
    const u = await user.findOne({ email })
    if (!u) {
      res.status(500).end(`No user with email ${email}`)
    }
    res.status(200).send({user: u})
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
