import {
	Box,
	Button,
	IconButton,
	Stack,
	SwipeableDrawer,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "../mui/theme";
import { CloseIcon, EmptyIcon } from "../../assets/Svgs";
import CartTemplate from "./CartTemplate";
import { useNavigate } from "react-router-dom";

function CartDrawer({ open, toggleDrawer, cartData }) {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const navigate = useNavigate();

	const calculateTotal = () => {
		const total = cartData.reduce((accumulator, product) => {
			return accumulator + product.productPrice;
		}, 0);

		return total.toFixed(2); // Assuming prices are in dollars and cents
	};
	const list = (
		<Box
			sx={{
				width: { xs: "75vw", md: "35vw" },
				display: "flex",
				flexDirection: "column",
			}}
			role="presentation">
			<Box
				p={2}
				sx={{
					background: theme.palette.background.default,
				}}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<Typography variant="h1" sx={{ fontSize: "30px" }}>
						Cart
					</Typography>
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
				{cartData.length > 0 ? (
					<Stack spacing={5}>
						{cartData?.map((item) => (
							<CartTemplate
								key={item.objectId}
								item={item}
								selectedProduct={selectedProduct}
								setSelectedProduct={setSelectedProduct}
							/>
						))}
					</Stack>
				) : (
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
						}}>
						<EmptyIcon />
						<Typography align="center">Cart is empty</Typography>
					</Box>
				)}
			</Box>

			{cartData.length > 0 && (
				<Stack p={2} spacing={2}>
					<Stack direction="row" justifyContent="space-between">
						<Typography sx={{ textTransform: "uppercase", fontWeight: 600 }}>
							Subtotal:
						</Typography>
						<Typography sx={{ textTransform: "uppercase", fontWeight: 600 }}>
							${calculateTotal()}
						</Typography>
					</Stack>
					<Button
						onClick={() => {
							toggleDrawer();
							navigate("/checkout");
						}}
						variant="contained"
						sx={{ height: "50px" }}
						fullWidth>
						Proceed to Checkout
					</Button>
				</Stack>
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
		</>
	);
}

export default CartDrawer;
