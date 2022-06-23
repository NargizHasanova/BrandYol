import * as React from 'react';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, fetchUsersData } from '../../redux/userSlice';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const emailRef = useRef()
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [userLastNameError, setUserLastNameError] = useState(false);
  const [noUser, setNoUser] = useState(true);

  useEffect(() => {
    if (userName.trim().length === 1 || typeof (Number(userName)) === "number") {
      setUserNameError(true)
    }
    if (userName.trim().length === 0 ||
      typeof (Number(userName)) !== "number" ||
      userName.trim().length > 1) {
      setUserNameError(false)
    }
    if (userLastName.trim().length === 1 || typeof (Number(userLastName)) === "number") {
      setUserLastNameError(true)
    }
    if (userLastName.trim().length === 0 ||
      typeof (Number(userLastName)) !== "number" ||
      userLastName.trim().length > 1) {
      setUserLastNameError(false)
    }
  }, [userName, userLastName]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userNameError || userLastNameError) {
      return
    }
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const signInData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    await dispatch(fetchUsersData(signInData))
    dispatch(checkUser(signInData))
    navigate("/")
  };


  console.log(users.data);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={userNameError}
              id={userNameError ? "outlined-error-helper-text" : "email"}
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              error={userLastNameError}
              id={userLastNameError ? "outlined-error-helper-text" : "password"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}