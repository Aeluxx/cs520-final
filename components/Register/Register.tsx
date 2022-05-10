// Copied from
// https://github.com/mui-org/material-ui/blob/next/docs/src/pages/getting-started/templates/sign-in/SignIn.tsx

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const Register = () => {
  const router = useRouter()
  const [errMessage, setErrMessage] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:3000/api/register', {
      name,
      email,
      password,
    }).then(res => router.push('/login')).catch(() => setErrMessage('Please make sure all fields are filled out...'))

  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
          />
          <TextField
            margin='normal'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
          />
          <TextField
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            label='Password'
            type='password'
          />
          <TextField
            margin='normal'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            fullWidth
            label='Confirm Password'
            type='password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' name='rememberMe' id='rememberMe' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>

      <Typography variant='body2'>
        Don&apos;t have an account? <Link href='/register'>Create an account</Link>
      </Typography>
      <Typography variant='caption' color='red'>
        {errMessage}
      </Typography>
    </Container>
  )
}

export default Register
