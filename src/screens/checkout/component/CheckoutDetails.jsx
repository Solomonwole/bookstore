import {
	Box,
	Button,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useSiteContext } from "../../../context/UserContext";
import { IoMdClose } from "react-icons/io";
import { EmptyIcon } from "../../../assets/Svgs";
import Parse from "../../../api/ApiCOnfig";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import { useState } from "react";

function CheckoutDetails({ setOrderCompleted, setOrderedProducts }) {
	const currentUser = Parse.User.current();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { cart, setCart, setAlertMessage, setAlertSeverity, handleAlertOpen } =
		useSiteContext();

	const calculateTotal = () => {
		const total = cart.reduce((accumulator, product) => {
			return accumulator + product.productPrice;
		}, 0);

		return total.toFixed(2); // Assuming prices are in dollars and cents
	};

	const handleOpen = () => setOpen(true);

	const placeOrder = async () => {
		setLoading(true);
		try {
			// Check if the user is logged in
			if (!currentUser) {
				// Redirect to login if not logged in
				navigate("/login");
				return;
			}

			// Create a new Parse Object for the Orders class
			const order = new Parse.Object("Orders");

			// Add properties to the order object
			order.set("user", currentUser.toPointer());
			order.set("totalAmount", parseFloat(calculateTotal()));
			order.set("status", "completed");

			// Save the order object to Parse Server
			const savedOrder = await order.save();

			// Add each item in the cart to the orderItems relation
			for (const item of cart) {
				const orderItem = new Parse.Object("OrderItems");
				orderItem.set("user", currentUser.toPointer());
				orderItem.set("product", item);
				orderItem.set("quantity", 1); // You may adjust the quantity based on your requirement
				orderItem.set("status", "completed");
				// Save the orderItem before adding to the relation
				await orderItem.save();

				// Add the saved orderItem to the orderItems relation
				savedOrder.relation("orderItems").add(orderItem);
			}

			// Save the updated order object with the added orderItems
			await savedOrder.save().then((result) => {
				console.log(result.toJSON());
				setOrderedProducts(result.toJSON());
			});

			// Clear the cart after placing the order
			setCart([]);
			localStorage.removeItem("cart");

			// Activate Thank You
			setOrderCompleted(true);
			// Display success message or redirect to order confirmation page
			console.log("Order placed successfully:", savedOrder);

			setAlertMessage("Order placed successfully");
			setAlertSeverity("success");
			handleAlertOpen();

			setLoading(false);
		} catch (error) {
			console.error("Error placing order:", error);
			// Display error message to the user
			setAlertMessage("Error placing order. Please try again.");
			setAlertSeverity("error");
			handleAlertOpen();
			setLoading(false);
		}
	};

	return (
		<>
			<Box mb={10}>
				{cart.length > 0 ? (
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
							gap: 3,
						}}>
						{/* Product Details */}
						<Box>
							<Stack spacing={5}>
								{cart?.map((item) => (
									<ProductItems key={item.objectId} item={item} />
								))}
							</Stack>

							<Box mt={5}>
								<TextField
									type="text"
									placeholder="Coupon Code"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<Button
													onClick={() => {
														setAlertMessage("INVALID COUPON CODE");
														setAlertSeverity("error");
														handleAlertOpen();
													}}>
													APPLY COUPON
												</Button>
											</InputAdornment>
										),
									}}
								/>
							</Box>
						</Box>

						{/* Calculations */}
						<Box>
							<Box sx={{ p: 2, border: "1px solid #000" }}>
								<Typography
									variant="h1"
									mb={5}
									sx={{ fontWeight: 600, fontSize: "16px" }}>
									CART TOTALS
								</Typography>
								<Stack spacing={3}>
									<Stack direction="row" mb={3}>
										<Typography mb={3} sx={{ fontWeight: 600, width: "35%" }}>
											SUBTOTAL
										</Typography>
										<Typography
											sx={{ textTransform: "uppercase", fontWeight: 600 }}>
											${calculateTotal()}
										</Typography>
									</Stack>
									<hr />
									<Stack direction="row" mb={3}>
										<Typography mb={3} sx={{ fontWeight: 600, width: "35%" }}>
											VAT
										</Typography>
										<Typography
											sx={{ textTransform: "uppercase", fontWeight: 600 }}>
											$0.00
										</Typography>
									</Stack>
									<hr />
									<Stack direction="row" mb={3}>
										<Typography mb={3} sx={{ fontWeight: 600, width: "35%" }}>
											PAYMENT METHOD
										</Typography>
										<Typography
											sx={{ textTransform: "uppercase", fontWeight: 600 }}>
											BANK TRANSFER
										</Typography>
									</Stack>
									<hr />
									<Stack direction="row" mb={3}>
										<Typography mb={3} sx={{ fontWeight: 600, width: "35%" }}>
											TOTAL
										</Typography>
										<Typography sx={{ fontWeight: 600, width: "35%" }}>
											${calculateTotal()}
										</Typography>
									</Stack>
								</Stack>
							</Box>

							<Box mt={3}>
								{currentUser ? (
									<Button
										variant="contained"
										type="button"
										onClick={handleOpen}
										fullWidth
										sx={{ height: "50px" }}>
										Proceed to Pay
									</Button>
								) : (
									<Button
										variant="contained"
										fullWidth
										sx={{ height: "50px" }}
										onClick={() => navigate("/login")}>
										Login to complete order
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				) : (
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<EmptyIcon style={{ width: "300px" }} />
						<Typography align="center">Cart is empty</Typography>
					</Box>
				)}
			</Box>

			<PaymentModal
				open={open}
				setOpen={setOpen}
				amount={calculateTotal()}
				placeOrder={placeOrder}
				loading={loading}
			/>
		</>
	);
}

export default CheckoutDetails;

function ProductItems({ item }) {
	const { setCart } = useSiteContext();
	const handleDelete = () => {
		// Implement your delete logic here
		console.log(`Deleting product with ID: ${item.objectId}`);

		// Retrieve the cart from localStorage
		const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

		// Filter out the selected product
		const updatedCart = storedCart.filter(
			(product) => product.objectId !== item.objectId
		);

		// Save the updated cart back to localStorage
		localStorage.setItem("cart", JSON.stringify(updatedCart));
		setCart(updatedCart);
	};
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="start"
				sx={{ borderBottom: "1px solid #00000021", pb: 2 }}>
				<Stack direction="row" spacing={3}>
					<Box
						sx={{
							height: "100px",
							width: "100px",
						}}>
						<img
							src={item.productImage.url}
							alt=""
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</Box>
					<Stack>
						<Typography sx={{ fontWeight: 600 }}>
							Title: {item.productTitle}
						</Typography>
						<Typography variant="caption" color="grey" sx={{ fontWeight: 600 }}>
							Author: {item.productAuthor}
						</Typography>
						<Typography
							variant="caption"
							color="primary"
							sx={{ fontWeight: 600 }}>
							Price: ${item.productPrice}
						</Typography>
						<Typography variant="caption" color="grey" sx={{ fontWeight: 600 }}>
							Category: {item.productCategory}
						</Typography>
					</Stack>
				</Stack>
				<Box>
					<IoMdClose
						size={20}
						style={{ cursor: "pointer" }}
						color="#f00"
						onClick={handleDelete}
					/>
				</Box>
			</Stack>
		</>
	);
}
