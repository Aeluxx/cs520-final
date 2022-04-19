import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit'
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
const App = () => {
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
    <ThemeProvider theme={lightTheme}>
      <Router>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='edit' element={<Edit />}>
            <Route path=':docId' element={<Edit />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
