import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import user from '../../models/user'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const userNameIsValid = (username: string) => {
    // Username must exist
    return !!username
  }
  const passwordIsValid = (password: string) => {
    // Password must exist
    return !!password
  }

  try {
    // TODO: Create user
    const { username, password, email } = req.body
    if (!userNameIsValid(username)) {
      res.status(500).end('Username is not valid')
    }
    if (!passwordIsValid(password)) {
      res.status(500).end('Password is not valid')
    }

    user.create({})


    res.status(200).send({ done: true })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
