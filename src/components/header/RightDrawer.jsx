import {
	Avatar,
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	SwipeableDrawer,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../mui/theme";
import { CloseIcon, SearchIcon } from "../../assets/Svgs";
import { NavLink, useNavigate } from "react-router-dom";
import { useSiteContext } from "../../context/UserContext";
import { BsBox2 } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { LogoutModal } from "./ProfileNav";

function RightDrawer({ open, toggleDrawer, currentUser }) {
	const { searchText, setSearchText, products, setFilteredProducts, userData } =
		useSiteContext();
	const navigate = useNavigate();
	const [openLogout, setOpenLogout] = useState(false);

	useEffect(() => {
		const handleSearch = () => {
			const searchTerm = searchText.toLowerCase();
			if (searchTerm === "") {
				setFilteredProducts(products);
			} else {
				const filtered = products.filter(
					(product) =>
						product.productTitle.toLowerCase().includes(searchTerm) ||
						product.productCategory.toLowerCase().includes(searchTerm)
				);
				setFilteredProducts(filtered);
			}
		};

		handleSearch();
	}, [products, searchText, setFilteredProducts]);
	const list = (
		<Box
			sx={{
				width: { xs: "65vw", md: "35vw" },
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
			role="presentation">
			<Box
				p={2}
				sx={{
					background: theme.palette.background.default,
				}}>
				<Stack direction="row" justifyContent="end" alignItems="center">
					<IconButton
						onClick={toggleDrawer}
						sx={{
							background: theme.palette.primary.main,
							borderRadius: "5px",
							height: "40px",
							width: "40px",

							"&:hover": {
								background: theme.palette.primary.main,
								borderRadius: "5px",
								height: "40px",
								width: "40px",
							},
						}}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</Box>
			<Box flex={1} p={2} sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					id="outlined-basic"
					placeholder="Search books..."
					variant="outlined"
					sx={{ width: "100%", mb: 3 }}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
						style: {
							borderRadius: "10px",
						},
					}}
				/>
				{currentUser ? (
					<Stack spacing={3}>
						<NavLink to="/orders" onClick={toggleDrawer}>
							<Stack direction="row" alignItems="center" spacing={2}>
								<BsBox2 size={20} style={{ color: "#000" }} />
								<Typography color="black">Orders</Typography>
							</Stack>
						</NavLink>
						<NavLink
							onClick={() => {
								toggleDrawer();
								setOpenLogout(true);
							}}>
							<Stack direction="row" alignItems="center" spacing={2}>
								<CiLogin size={20} style={{ color: "#f00" }} />
								<Typography color="error">Logout</Typography>
							</Stack>
						</NavLink>
					</Stack>
				) : (
					<Stack spacing={2} mt={2}>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => {
								toggleDrawer();
								navigate("/login");
							}}
							sx={{ height: "50px" }}>
							Login
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								toggleDrawer();
								navigate("/signup");
							}}
							sx={{ height: "50px" }}>
							Sign Up
						</Button>
					</Stack>
				)}
			</Box>
			{currentUser && (
				<Box p={2} sx={{ background: theme.palette.grey.main }}>
					<Stack mb={1} direction="row" alignItems="center" spacing={2}>
						<Avatar
							sx={{ bgcolor: theme.palette.primary.main, cursor: "pointer" }}>
							{userData.firstName.charAt(0).toUpperCase()}
							{userData.lastName.charAt(0).toUpperCase()}
						</Avatar>

						<Stack>
							<Typography color="white" sx={{ fontWeight: 600 }}>
								{userData.firstName} {userData.lastName}
							</Typography>
							<Typography color="black" variant="caption">
								{userData.username && userData.username.length > 19
									? userData.username.slice(0, 19) + "..."
									: userData.username}
							</Typography>
						</Stack>
					</Stack>
				</Box>
			)}
		</Box>
	);
	return (
		<>
			<SwipeableDrawer
				anchor="right"
				open={open}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}>
				{list}
			</SwipeableDrawer>
			<LogoutModal open={openLogout} setOpen={setOpenLogout} />
		</>
	);
}

export default RightDrawer;
