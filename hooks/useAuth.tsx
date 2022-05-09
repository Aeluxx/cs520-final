// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from 'react'
import axios, { AxiosPromise } from 'axios'
import { useRouter } from 'next/router'

type UserType = {
  _id: string
  email: string
  name: string
}

type LoginDataType = {
  email: string
  password: string
}

interface AuthContextType {
  user: UserType | null
  login: (loginData: LoginDataType) => AxiosPromise
  logout: () => any
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderType = {
  children?: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType
}

const useProvideAuth = (): AuthContextType => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const login = (loginData: LoginDataType): AxiosPromise => {
    return axios
      .post('http://localhost:3000/api/login', loginData)
      .then(res => {
        // TODO: Set JWT once that is implemented
        localStorage.setItem('authorization', res.data.token)
        setUser(res.data.user)
      })
      .catch(err => {
        return err
      })
  }
  const logout = () => {
    localStorage.removeItem('authorization')
    setUser(null)
    router.push('/login')
  }
  useEffect(() => {
    const token = localStorage.getItem('authorization')
    // if (!token) {
    //   router.push('/login')
    //   return;
    // }
    axios
      .get('http://localhost:3000/api/login', { headers: { Authorization: token as string } })
      .then(res => {
        setUser(res.data.user)
      })
      .catch(err => {
        logout()
      })
  }, [])

  return {
    login,
    logout,
    user,
  }
}

export default useAuth
