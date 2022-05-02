import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import user from '../../models/user'
import connectDB from '../../middleware/connectDb'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  const userNameIsValid = (username: string) => {
    // Username must exist
    return !!username
  }
  const passwordIsValid = (password: string) => {
    // Password must exist
    return !!password
  }

  try {
    const { name, password, email } = req.body
    if (!userNameIsValid(name)) {
      res.status(500).end('Username is not valid')
    }
    if (!passwordIsValid(password)) {
      res.status(500).end('Password is not valid')
    }

    const newUser = await user.create({email, password, name})

    res.status(200).send(newUser)
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
