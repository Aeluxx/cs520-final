import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import UserModel from '../../models/user'
import connectDB from '../../middleware/connectDb'
import jwt from 'jsonwebtoken'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(500).end(`No user with email ${email}`)
    }
    res.status(200).send({user, token: jwt.sign({...user}, process.env.JWT_SECRET as string)})
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
