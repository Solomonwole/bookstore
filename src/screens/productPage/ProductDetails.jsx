import React, { useEffect, useState } from "react";
import Parse from "../../api/ApiCOnfig";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
	Box,
	Breadcrumbs,
	Button,
	Container,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useSiteContext } from "../../context/UserContext";
import ProductDetailsLoader from "./ProductDetailsLoader";
import ProductTemplate from "../../components/products/ProductTemplate";

function ProductDetails() {
	const { productTitle } = useParams();
	const [product, setProduct] = useState(null);
	const {
		products,
		cart,
		setCart,
		setAlertMessage,
		setAlertSeverity,
		handleAlertOpen,
	} = useSiteContext();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const Product = Parse.Object.extend("Products");
				const query = new Parse.Query(Product);

				const formattedProductTitle = productTitle.replace(/-/g, " "); // Replace hyphens with spaces
				query.equalTo("productTitle", formattedProductTitle);

				const result = await query.first();

				if (result) {
					setProduct(result.toJSON());
				} else {
					console.error("Product not found with productTitle:", productTitle);
					setAlertMessage("Product not found with");
					setAlertSeverity("error");
					handleAlertOpen();
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching product:", error);
				setLoading(false);
				setAlertMessage(error.message);
				setAlertSeverity("error");
				handleAlertOpen();
			}
		};

		fetchProduct();
	}, [handleAlertOpen, productTitle, setAlertMessage, setAlertSeverity]);

	const addToCart = () => {
		// Check if the product is already in the cart
		const existingProductIndex = cart.findIndex(
			(item) => item.objectId === product.objectId
		);

		if (existingProductIndex !== -1) {
			setAlertMessage("Product already in cart");
			setAlertSeverity("warning");
			handleAlertOpen();
		} else {
			// Product doesn't exist in the cart, add a new item
			const updatedCart = [...cart, { ...product }];
			setCart(updatedCart);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			console.log("Product added to cart:", product);
			console.log("Updated cart:", updatedCart);
			setAlertMessage("Product added to cart");
			setAlertSeverity("success");
			handleAlertOpen();
		}
	};

	console.log(cart);

	return (
		<>
			{loading ? (
				<ProductDetailsLoader />
			) : (
				<>
					{product && (
						<Container maxWidth="lg">
							<Box mt={3}>
								<Breadcrumbs separator="›" aria-label="breadcrumb">
									<NavLink underline="hover" to="/">
										<Typography color="grey">Home</Typography>
									</NavLink>
									<NavLink underline="hover" to="/">
										<Typography color="grey">
											{product.productCategory} category
										</Typography>
									</NavLink>
									<Link underline="hover">
										<Typography color="primary">
											{product.productTitle}
										</Typography>
									</Link>
								</Breadcrumbs>
							</Box>
							<Box
								mb={10}
								sx={{ display: { xs: "block", md: "flex" }, gap: 3, mt: 5 }}>
								<Box
									sx={{
										width: { xs: "100%", md: "405px" },
										height: { xs: "400px", md: "400px" },
										border: "1px solid #00000028",
										p: 1,
									}}>
									{product.productImage ? (
										<img
											src={product.productImage.url}
											alt=""
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									) : (
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
											alt=""
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									)}
								</Box>

								<Box
									mt={{ xs: 4, md: 0 }}
									mb={{ xs: 4, md: 0 }}
									sx={{
										display: "flex",
										flexDirection: "column",
										flex: 1,
									}}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}>
										<Box flex={1} width="100%">
											<Typography variant="h2">
												Title: {product.productTitle}
											</Typography>
											<Typography variant="caption" color="grey">
												Author: {product.productAuthor}
											</Typography>
											<Typography variant="body1" color="primary">
												${product.productPrice}
											</Typography>
										</Box>

										{/* Add to cart  */}
										<Box
											sx={{
												display: "flex",
												justifyContent: "flex-start",
												alignItems: "flex-end",
												flexDirection: "column",
											}}>
											{/* <Button variant="contained" onClick={addToCart}>
												Add to cart
											</Button> */}
										</Box>
									</Box>
									<Box mt={5}>
										<Stack spacing={3}>
											<Typography>{product.productDescription}</Typography>
											<Box
												sx={{ display: "flex", gap: 1, alignItems: "center" }}>
												<Typography color="grey">Quantity:</Typography>
												<TextField
													type="number"
													value={1}
													InputProps={{
														readOnly: true,
													}}
												/>
											</Box>
											<Button
												variant="contained"
												sx={{ height: "50px" }}
												onClick={addToCart}>
												Add to cart
											</Button>
										</Stack>
									</Box>
								</Box>
							</Box>
						</Container>
					)}

					{products && (
						<Container maxWidth="lg">
							<Box mb={10}>
								<Stack direction="row" justifyContent="space-between">
									<Typography
										variant="body1"
										sx={{ fontWeight: 600, fontSize: "20px" }}>
										More E-Books
									</Typography>
									<Typography
										color="primary"
										variant="body1"
										sx={{
											fontWeight: 600,
											fontSize: "20px",
											cursor: "pointer",
										}}
										onClick={() => navigate("/")}>
										See More
									</Typography>
								</Stack>

								<Box
									mt={2}
									sx={{
										display: "grid",
										gridTemplateColumns: {
											xs: "1fr 1fr",
											sm: "1fr 1fr 1fr",
											md: "1fr 1fr 1fr 1fr",
										},
										gap: 3,
									}}>
									{products.slice(0, 4).map((item) => (
										<ProductTemplate key={item.objectId} item={item} />
									))}
								</Box>
							</Box>
						</Container>
					)}
				</>
			)}
		</>
	);
}

export default ProductDetails;
