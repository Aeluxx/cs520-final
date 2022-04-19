import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'

export default function NavBar() {
  return (
      <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} position='relative'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
  )
}
