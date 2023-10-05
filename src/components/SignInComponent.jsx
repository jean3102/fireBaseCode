import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { app } from '../config/fireBase.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useState, useEffect } from 'react';

const theme = createTheme();

export default function SignInComponent() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const auth = getAuth(app);

  /* Checking if the user is online, if the user is online, it will navigate to the home page. */
  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/home');
  }, []);
  /**
   * The function creates a new user with an email and password, and then logs the user in.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    const data = new FormData(event.currentTarget); //Creating a new FormData object from the form element.
    const email = data.get('email');
    const password = data.get('password');

    if (email === '') return setEmailError(true);
    if (password === '') return setPasswordError(true);

    clearError(); //? A function that clears the error state.

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          signOut(auth);
          Swal.fire({
            icon: 'warning',
            title: 'You most verify your email.',
            showConfirmButton: true,
          });
          return false;
        }

        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/wrong-password'
        ) {
          setEmailError(true);
          setPasswordError(true);
        }
        if (errorCode === 'auth/too-many-requests') {
          Swal.fire({
            title: 'Temporarily disabled',
            icon: 'warning',
            text: 'Access to this account has been temporarily disabled due to many failed login.',
            showConfirmButton: true,
          });
          return false;
        }
      });
  };

  const restPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });

    if (email) {
      sendPasswordResetEmail(auth, email)
        .then((res) => {
          console.log(`🚀 ------------ res:`, res);
          // Password reset email sent!
          Swal.fire({
            icon: 'success',
            title: `The verification email has just been sent to ${email}.`,
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(`🚀 ------------ error:`, error);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Email could not be sent.',
            showConfirmButton: true,
          });
        });
    }
  };
  const clearError = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              color="success"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              Sign In
            </Button>

            <Grid container>
              <Grid
                item
                xs>
                <span
                  style={{ color: '#1976d2', cursor: 'pointer' }}
                  onClick={restPassword}>
                  Forgot password?
                </span>
              </Grid>
              <Grid item>
                {"Don't have an account? "}
                <span
                  style={{ color: '#1976d2', cursor: 'pointer' }}
                  onClick={() => navigate('/register')}>
                  Sign Up
                </span>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
