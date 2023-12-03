import {
	Box,
	Button,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Preloader from "../../utils/constants/Preloader";
import Parse from "../../api/ApiCOnfig";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../../context/UserContext";

function LoginPage() {
	const { setUserData, setAlertMessage, setAlertSeverity, handleAlertOpen } =
		useSiteContext();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [wrong, setWrong] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		const lowercaseValue = name === "username" ? value.toLowerCase() : value;

		setFormData({
			...formData,
			[name]: lowercaseValue,
		});
	};

	const handleLoginForm = async (e) => {
		setLoading(true);
		setWrong(false);
		e.preventDefault();
		try {
			await Parse.User.logIn(formData.username, formData.password).then(
				(user) => {
					setUserData(user.toJSON());
					navigate("/");
				}
			);
			setLoading(false);
		} catch (error) {
			console.log(error.message);

			if (error.message === "Invalid username/password.") {
				setWrong(true);
			} else {
				setAlertMessage(error.message);
				setAlertSeverity("error");
				handleAlertOpen();
			}

			setLoading(false);
		}
	};
	return (
		<>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					mt: 3,
					mb: 5,
				}}>
				<Box
					sx={{
						width: "100%",
						maxWidth: 600,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 3,
						overflowY: "auto",
						p: 4,
					}}>
					<Stack>
						<Typography variant="h1" align="center">
							Welcome back
						</Typography>
						<Typography align="center" color="grey">
							Glad to see you again
						</Typography>
						<Typography align="center" color="grey">
							Login to your account below
						</Typography>
					</Stack>
					<Box width="100%" mt={1} component="form" onSubmit={handleLoginForm}>
						<Stack spacing={2} mb={3}>
							<Stack spacing={0.5}>
								<Typography>Username/Email:</Typography>
								<TextField
									type="email"
									sx={inStyle}
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									error={wrong}
									required
									helperText={
										wrong && (
											<Typography sx={{ ml: -1.5 }}>
												Wrong Username/Email or Password
											</Typography>
										)
									}
								/>
							</Stack>
							<Stack spacing={0.5}>
								<Typography>Password:</Typography>
								<TextField
									type={showPassword ? "text" : "password"}
									sx={inStyle}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									error={wrong}
									required
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												{showPassword ? (
													<FiEye
														size={20}
														style={{ cursor: "pointer" }}
														onClick={() => setShowPassword(false)}
													/>
												) : (
													<FiEyeOff
														size={20}
														style={{ cursor: "pointer" }}
														onClick={() => setShowPassword(true)}
													/>
												)}
											</InputAdornment>
										),
									}}
									helperText={
										wrong && (
											<Typography sx={{ ml: -1.5 }}>
												Wrong Username/Email or Password
											</Typography>
										)
									}
								/>
							</Stack>

							<Box sx={{ display: "flex", justifyContent: "end" }}>
								<Button
									type="button"
									color="primary"
									variant="text"
									fullWidth
									onClick={() => {
										window.scrollTo(0, 0);
										navigate("/forgot-password");
									}}>
									Forgot Password?
								</Button>
							</Box>
						</Stack>

						<Stack spacing={2}>
							{loading ? (
								<Button
									type="button"
									variant="contained"
									fullWidth
									sx={{ height: "50px" }}>
									<Preloader />
								</Button>
							) : (
								<Button
									type="submit"
									variant="contained"
									fullWidth
									sx={{ height: "50px" }}>
									Login
								</Button>
							)}
							<Typography align="center" color="grey">
								Don&apos;t have an account?{" "}
								<Typography
									component="span"
									color="primary"
									sx={{ fontWeight: 600, cursor: "pointer" }}
									onClick={() => {
										window.scrollTo(0, 0);
										navigate("/signup");
									}}>
									Get Started
								</Typography>
							</Typography>
						</Stack>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default LoginPage;

const inStyle = { width: "100%" };
