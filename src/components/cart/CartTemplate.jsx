import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSiteContext } from "../../context/UserContext";
import { IoMdClose } from "react-icons/io";

function CartTemplate({ item, selectedProduct, setSelectedProduct, onDelete }) {
	console.log(item);
	const { setCart } = useSiteContext();
	const isProductSelected = selectedProduct === item.objectId;

	const handleClick = () => {
		if (isProductSelected) {
			setSelectedProduct(null); // Deselect the product if already selected
		} else {
			setSelectedProduct(item.objectId); // Select the product
		}
	};

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
				<Stack direction="row" spacing={1} onClick={handleClick}>
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
								borderRadius: "5px",
							}}
						/>
					</Box>
					<Stack>
						<Typography sx={{ fontWeight: 600 }}>
							{item.productTitle}
						</Typography>
						<Typography variant="caption" color="grey" sx={{ fontWeight: 600 }}>
							{item.productAuthor}
						</Typography>
						<Typography
							variant="caption"
							color="primary"
							sx={{ fontWeight: 600 }}>
							${item.productPrice}
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

			{/* {isProductSelected && (
				<Button variant="contained" onClick={handleDelete}>
					Delete
				</Button>
			)} */}
		</>
	);
}

export default CartTemplate;
