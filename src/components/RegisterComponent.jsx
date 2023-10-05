import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { app } from '../config/fireBase.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	sendEmailVerification,
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';



const theme = createTheme();

export default function RegisterComponent() {
	const navigate = useNavigate();
	const [fullNameError, setFullNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	useEffect(() => {
		/* Checking if the user is logged in. If the user is logged in, it will redirect the user to the home
    page. */
		if (localStorage.getItem('user')) navigate('/home');
	}, []);

	/**
	 * The function creates a new user with an email and password, and then logs the user in.
	 */
	const handleSubmit = (event) => {
		event.preventDefault();
		setFullNameError(false);
		setEmailError(false);
		setPasswordError(false);
		const data = new FormData(event.currentTarget); //Creating a new FormData object from the form element.
		const fullName = data.get('fullName');
		const email = data.get('email');
		const password = data.get('password');

		if (fullName === '') return setFullNameError(true);
		if (email === '') return setEmailError(true);
		if (password === '') return setPasswordError(true);

		clearError(); //? A function that clears the error state.

		//TODO Initialize Firebase Authentication and get a reference to the service
		const auth = getAuth(app);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				/* It sends an email to the user to verify their email address. */
				sendEmailVerification(user);
				signOut(auth);
				if (user) {
					localStorage.setItem('userName', fullName);
					Swal.fire({
						icon: 'success',
						title: 'We have sent you a verification email.',
						showConfirmButton: false,
						timer: 2500,
					}).then(() => {
						navigate('/');
					});
				}
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === 'auth/email-already-in-use') setEmailError(true);
			});
	};

	const clearError = () => {
		setEmailError(false);
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
						Sign Up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							autoFocus
							margin="normal"
							required
							fullWidth
							name="fullName"
							label="Full Name"
							type="text"
							id="fullName"
							autoComplete="fullName"
							error={fullNameError}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
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
							variant="contained"
							color="success"
							sx={{ mt: 3, mb: 2 }}>
							Create Account
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
