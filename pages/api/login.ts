import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import UserModel from '../../models/user'
import connectDB from '../../middleware/connectDb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nc from 'next-connect'

const handler = nc()
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      res.status(500).send(`No user with email ${email}`)
    }
    else if (!bcrypt.compareSync(password, user.password)){
      res.status(500).send('Invalid password')
    }
    const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, process.env.JWT_SECRET as string)
    res.status(200).send({ user, token })
  } catch (error: any) {
    console.error(error)
    res.status(500).send(error.message)
  }
})
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  try {
    const token = req?.headers?.authorization
    if (!token) res.status(500).end('No JWT provided')
    else {
      const payload = jwt.decode(token as string)

      // @ts-ignore
      // @ts-ignore
      const user = await UserModel.findOne({ email: payload?.email })
      if (!user) {
        res.status(500).end('No user found for given JWT')
      } else {
        res.status(200).send({ user })
      }
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
})

export default handler
