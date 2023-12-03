import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuItem,
	Modal,
	Stack,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "../mui/theme";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { useSiteContext } from "../../context/UserContext";
import Parse from "../../api/ApiCOnfig";

function ProfileNav() {
	const { userData } = useSiteContext();
	const [openLogout, setOpenLogout] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			{userData ? (
				<Avatar
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
					sx={{ bgcolor: theme.palette.primary.main, cursor: "pointer" }}>
					{userData.firstName.charAt(0).toUpperCase()}
					{userData.lastName.charAt(0).toUpperCase()}
				</Avatar>
			) : (
				<Avatar
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					sx={{ bgcolor: theme.palette.primary.main, cursor: "pointer" }}
					onClick={handleClick}
				/>
			)}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{ mt: 1.7 }}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}>
				<Box sx={{ minWidth: 250, p: 2 }}>
					{userData && (
						<Stack mb={1} direction="row" alignItems="center" spacing={2}>
							<Avatar
								sx={{ bgcolor: theme.palette.primary.main, cursor: "pointer" }}>
								{userData.firstName.charAt(0).toUpperCase()}
								{userData.lastName.charAt(0).toUpperCase()}
							</Avatar>

							<Stack>
								<Typography color="black">
									{userData.firstName} {userData.lastName}
								</Typography>
								<Typography color="grey" variant="caption">
									{userData.username}
								</Typography>
							</Stack>
						</Stack>
					)}
					<hr />
					<Stack spacing={1} mt={2}>
						<MenuItem onClick={handleClose}>
							<NavLink to="/user-orders">
								<Stack direction="row" alignItems="center" spacing={2}>
									<BsBox2 size={20} style={{ color: "#000" }} />
									<Typography color="black">Orders</Typography>
								</Stack>
							</NavLink>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
								setOpenLogout(true);
							}}>
							<NavLink>
								<Stack direction="row" alignItems="center" spacing={2}>
									<CiLogin size={20} style={{ color: "#f00" }} />
									<Typography color="error">Logout</Typography>
								</Stack>
							</NavLink>
						</MenuItem>
					</Stack>
				</Box>
			</Menu>
			<LogoutModal open={openLogout} setOpen={setOpenLogout} />
		</>
	);
}

export default ProfileNav;

export const LogoutModal = ({ open, setOpen }) => {
	const navigate = useNavigate();
	const { setUserData, setAlertMessage, setAlertSeverity, handleAlertOpen } =
		useSiteContext();
	const handleClose = () => setOpen(false);
	const handleLogout = () => {
		userLogout();
		handleClose();
	};

	const userLogout = async () => {
		try {
			await Parse.User.logOut().then(() => {
				setUserData({});
				navigate("/");

				setAlertMessage("Logged out successfully");
				setAlertSeverity("success");
				handleAlertOpen();
			});
		} catch (error) {
			console.error("Error logging out user:", error);
		}
	};
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Box
						sx={{
							background: theme.palette.primary.main,
							mt: -4,
							mr: -4,
							ml: -4,
							p: 4,
						}}>
						<Typography
							color="white"
							variant="h1"
							component="h2"
							sx={{ fontSize: "30px" }}>
							Are you sure?
						</Typography>
					</Box>
					<Typography align="center" sx={{ mt: 2 }}>
						Are you sure you want to leave? you can't purchase without being
						logged in
					</Typography>

					<Box mt={4} sx={{ display: "flex", gap: 2 }}>
						<Button
							fullWidth
							variant="contained"
							sx={{ height: "50px" }}
							onClick={handleClose}>
							Never mind
						</Button>
						<Button
							fullWidth
							variant="outlined"
							sx={{
								height: "50px",
								fontWeight: 600,
								display: "flex",
								justifyContent: "center",
							}}
							onClick={handleLogout}>
							Logout
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};
