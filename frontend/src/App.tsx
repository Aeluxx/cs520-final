import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit'
function App() {
  return (
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
  )
}

export default App
