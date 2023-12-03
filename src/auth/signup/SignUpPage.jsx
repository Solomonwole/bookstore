import {
	Box,
	Button,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Preloader from "../../utils/constants/Preloader";
import Parse from "../../api/ApiCOnfig";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../../context/UserContext";

function SignUpPage() {
	const { setUserData } = useSiteContext();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [wrong, setWrong] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		const lowercaseValue = name === "username" ? value.toLowerCase() : value;

		setFormData({
			...formData,
			[name]: lowercaseValue,
		});
	};

	useEffect(() => {
		if (formData.confirmPassword !== formData.password) {
			setWrong(true);
		} else {
			setWrong(false);
		}
	}, [formData.confirmPassword, formData.password]);

	const handleLoginForm = async (e) => {
		setLoading(true);
		setWrong(false);
		e.preventDefault();

		try {
			const user = new Parse.User();
			user.set("username", formData.username);
			user.set("email", formData.username);
			user.set("password", formData.password);
			user.set("firstName", formData.firstName);
			user.set("lastName", formData.lastName);

			await user.signUp().then((user) => {
				setUserData(user.toJSON());
				navigate("/");
			});
		} catch (error) {
			console.log(error.message);
			setWrong(true);
		} finally {
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
					<Stack
						sx={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}>
						<Typography variant="h1" align="center">
							Sign up
						</Typography>
						<Typography
							align="center"
							color="grey"
							sx={{ width: { xs: "100%", md: "60%" } }}>
							Enter your details below to create your account and get started.
						</Typography>
					</Stack>
					<Box width="100%" mt={1} component="form" onSubmit={handleLoginForm}>
						<Stack spacing={2} mb={3}>
							<Stack spacing={0.5}>
								<Typography>First Name:</Typography>
								<TextField
									type="text"
									sx={inStyle}
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									required
								/>
							</Stack>
							<Stack spacing={0.5}>
								<Typography>Last Name:</Typography>
								<TextField
									type="text"
									sx={inStyle}
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									required
								/>
							</Stack>
							<Stack spacing={0.5}>
								<Typography>Username/Email:</Typography>
								<TextField
									type="email"
									sx={inStyle}
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									required
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
									required
									helperText={
										wrong && (
											<Typography sx={{ ml: -1.5 }}>
												Password does not match
											</Typography>
										)
									}
								/>
							</Stack>

							<Stack spacing={0.5}>
								<Typography>Confirm Password:</Typography>
								<TextField
									type={showConfirmPassword ? "text" : "password"}
									sx={inStyle}
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									error={wrong}
									required
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												{showConfirmPassword ? (
													<FiEye
														size={20}
														style={{ cursor: "pointer" }}
														onClick={() => setShowConfirmPassword(false)}
													/>
												) : (
													<FiEyeOff
														size={20}
														style={{ cursor: "pointer" }}
														onClick={() => setShowConfirmPassword(true)}
													/>
												)}
											</InputAdornment>
										),
									}}
									helperText={
										wrong && (
											<Typography sx={{ ml: -1.5 }}>
												Password does not match
											</Typography>
										)
									}
								/>
							</Stack>
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
									disabled={wrong}
									sx={{ height: "50px" }}>
									Create Account
								</Button>
							)}
							<Typography align="center" color="grey">
								Already have an account?{" "}
								<Typography
									component="span"
									color="primary"
									sx={{ fontWeight: 600, cursor: "pointer" }}
									onClick={() => {
										window.scrollTo(0, 0);
										navigate("/login");
									}}>
									Login
								</Typography>
							</Typography>
						</Stack>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default SignUpPage;

const inStyle = { width: "100%" };
