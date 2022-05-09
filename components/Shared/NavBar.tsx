import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import Image from 'next/image'
import pizza from '../../pizzapizza.png'

export default function NavBar() {
  const { user } = useAuth()
  return (
    <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} position='relative'>
      <Toolbar>
        <Image
          src={pizza}
          alt="PizzaPizza"
          width="125px"
          height="30px"
        />
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
