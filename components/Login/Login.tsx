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
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { FormEvent } from 'react'
import { useRouter } from 'next/router'

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const Login = () => {
  const [errMessage, setErrMessage] = useState<string>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ email, password })
      .then(() => router.push("/"))
      .catch(() => {
        console.log("Invalid Login");
        setErrMessage("Invalid Login");
      });
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
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' name='rememberMe' id='rememberMe' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Don&apos;t have an account? <Link href='/register'>Create an account</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant='caption' color='red'>
        {errMessage}
      </Typography>
    </Container>
  )
}

export default Login
