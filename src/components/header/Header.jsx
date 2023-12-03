import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Container,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Logo, SearchIcon } from "../../assets/Svgs";
import { theme } from "../mui/theme";
import RightDrawer from "./RightDrawer";
import { useSiteContext } from "../../context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import Parse from "../../api/ApiCOnfig";
import ProfileNav from "./ProfileNav";
import { NavLink } from "react-router-dom";
import CartDrawer from "../cart/CartDrawer";

function Header() {
	const { searchText, setSearchText, products, setFilteredProducts, cart } =
		useSiteContext();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerCartOpen, setDrawerCartOpen] = useState(false);
	const currentUser = Parse.User.current();

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};
	const toggleCartDrawer = () => {
		setDrawerCartOpen(!drawerCartOpen);
	};

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

	return (
		<>
			<AppBar
				elevation={0}
				position="sticky"
				sx={{
					background: theme.palette.background.default,
					borderBottom: `0.5px solid ${theme.palette.grey.dark}`,
				}}>
				<Toolbar sx={{ p: 0, margin: 0 }}>
					<Container maxWidth="lg">
						<Box
							pt={1}
							pb={1}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}>
							<NavLink to="/">
								<Logo />
							</NavLink>

							{/* Desktop  */}
							<Stack
								flex={1}
								direction="row"
								spacing={3}
								justifyContent="end"
								display={{ xs: "none", md: "flex" }}>
								<TextField
									placeholder="Search books..."
									variant="outlined"
									sx={{
										width: "50%",
										border: "none",
										"&:hover": {
											border: "none",
										},
									}}
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
								<Stack direction="row" spacing={2} alignItems="center">
									<Badge
										badgeContent={cart.length}
										color="primary"
										sx={{ color: "#fff" }}>
										<IconButton
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
											}}
											onClick={toggleCartDrawer}>
											<FaCartShopping size={16} style={{ color: "#fff" }} />
										</IconButton>
									</Badge>
									{currentUser ? (
										<ProfileNav />
									) : (
										<NavLink to="/login">
											<Avatar sx={{ background: theme.palette.primary.main }} />
										</NavLink>
									)}
								</Stack>
							</Stack>

							{/* Mobile  */}
							<Stack
								flex={1}
								direction="row"
								spacing={3}
								justifyContent="end"
								display={{ xs: "flex", md: "none" }}>
								{/* Cart  */}

								<Badge
									badgeContent={cart.length}
									color="primary"
									sx={{ color: "#fff" }}>
									<IconButton
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
										}}
										onClick={toggleCartDrawer}>
										<FaCartShopping size={16} style={{ color: "#fff" }} />
									</IconButton>
								</Badge>

								{currentUser ? (
									<ProfileNav />
								) : (
									// <IconButton
									// 	sx={{
									// 		background: theme.palette.primary.main,
									// 		borderRadius: "5px",
									// 		height: "40px",
									// 		width: "40px",

									// 		"&:hover": {
									// 			background: theme.palette.primary.main,
									// 			borderRadius: "5px",
									// 			height: "40px",
									// 			width: "40px",
									// 		},
									// 	}}
									// 	onClick={toggleDrawer}>
									// 	<MobileMenu />
									// </IconButton>

									<NavLink to="/login">
										<Avatar sx={{ background: theme.palette.primary.main }} />
									</NavLink>
								)}
							</Stack>
						</Box>
					</Container>
				</Toolbar>
			</AppBar>

			<RightDrawer
				open={drawerOpen}
				toggleDrawer={toggleDrawer}
				searchText={searchText}
				setSearchText={setSearchText}
				currentUser={currentUser}
			/>
			<CartDrawer
				open={drawerCartOpen}
				toggleDrawer={toggleCartDrawer}
				cartData={cart}
			/>
		</>
	);
}

export default Header;
