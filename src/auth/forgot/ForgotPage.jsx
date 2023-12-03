import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Preloader from "../../utils/constants/Preloader";
import Parse from "../../api/ApiCOnfig";
import { useNavigate } from "react-router-dom";

function ForgotPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const handleForgot = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await Parse.User.requestPasswordReset(email);
			setLoading(false);
			alert(`Success! Please check ${email} to proceed with password reset.`);
			setEmail("");
			navigate("/login");
		} catch (error) {
			console.log(`Error! ${error.message}`);
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
							Forgot Password?
						</Typography>
						<Typography align="center" color="grey">
							Glad to see you again
						</Typography>
						<Typography align="center" color="grey">
							Login to your account below
						</Typography>
					</Stack>
					<Box width="100%" mt={1} component="form" onSubmit={handleForgot}>
						<Stack spacing={2} mb={3}>
							<Stack spacing={0.5}>
								<Typography>Username/Email:</Typography>
								<TextField
									type="email"
									sx={inStyle}
									name="username"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
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
									sx={{ height: "50px" }}>
									Reset Password
								</Button>
							)}
						</Stack>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default ForgotPage;

const inStyle = { width: "100%" };
