import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import useAuth from '../../hooks/useAuth'

export default function NavBar() {
  const { user } = useAuth()
  return (
    <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} position='relative'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {user ? (
          <Typography>{user.name}</Typography>
        ) : (
          <Button href='/login' color='inherit'>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
