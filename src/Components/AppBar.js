import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from './../firebase'

import { UserContext } from '../Contexts/UserContext'

const NavBar = () => {
  const [user] = useAuthState(auth)
  const { userInfo, setUserInfo } = useContext(UserContext)

  const logoutUser = () => {
    logout()
    setUserInfo({})
  }

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
            Tereas
          </Typography>
          {user && (
            <Button color="inherit" onClick={logoutUser}>
              {userInfo.name} | Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
