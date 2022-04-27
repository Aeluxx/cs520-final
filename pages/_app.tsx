import '../styles/globals.css'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import NavBar from './../components/Shared/NavBar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
declare module '@mui/material/styles' {
  interface Theme {
    background: {
      offBackground : string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
      offBackground : string
    }
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })
  return (
  <>
    <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <NavBar/>
    <Component {...pageProps} />
    </ThemeProvider>
  </>
  )
}

export default MyApp
