import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from './../firebase'

const NavBar = () => {
  const [user] = useAuthState(auth)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tereas - next gen to-do
          </Typography>
          {user && (
            <Button color="inherit" onClick={logout}>
              {user.email} | Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar