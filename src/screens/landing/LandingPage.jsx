import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Container,
	List,
	ListItem,
	TextField,
	InputAdornment,
	IconButton,
	Menu,
	MenuItem,
	Pagination,
} from "@mui/material";
import Parse from "../../api/ApiCOnfig";
import ProductTemplate, {
	ProductTemplateLoading,
} from "../../components/products/ProductTemplate";
import { useSiteContext } from "../../context/UserContext";
import { SearchIcon } from "../../assets/Svgs";
import { FaFilter } from "react-icons/fa";
import { theme } from "../../components/mui/theme";

function LandingPage() {
	const [categories, setCategories] = useState([]);
	const {
		searchText,
		setSearchText,
		products,
		setProducts,
		filteredProducts,
		setFilteredProducts,
	} = useSiteContext();
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 16;
	const [loading, setLoading] = useState(true);
	const [currentCategory, setCurrentCategory] = useState("All");

	// Categories Menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// Categories Menu

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const Product = Parse.Object.extend("Products");
				const query = new Parse.Query(Product);

				// Order by updatedAt in descending order to get the latest products first
				query.descending("updatedAt");

				const results = await query.find();

				const productsData = results.map((product) => product.toJSON());

				setProducts(productsData);
				setFilteredProducts(productsData);

				const uniqueCategories = [
					...new Set(productsData.map((product) => product.productCategory)),
				];
				setCategories(uniqueCategories);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};

		fetchProducts();
	}, [setFilteredProducts, setProducts]);

	const handleCategoryClick = (category) => {
		setCurrentCategory(category);
		if (category === "All") {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter(
				(product) => product.productCategory === category
			);
			setFilteredProducts(filtered);
		}
		setCurrentPage(1);
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
			setCurrentPage(1);
		};

		handleSearch();
	}, [products, searchText, setFilteredProducts]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	console.log(loading);

	console.log(currentProducts);
	return (
		<Box pb={10}>
			<Container maxWidth="lg">
				<Box
					mt={3}
					// mb={5}
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", md: "1fr 4fr" },
					}}>
					{/* Categories  */}

					<Box
						sx={{
							borderRight: { md: "1px solid #D3D3D3" },
							display: { xs: "none", md: "block" },
							minHeight: { md: "90vh" },
						}}>
						<List>
							<ListItem
								key="all"
								onClick={() => handleCategoryClick("All")}
								sx={{
									backgroundColor:
										currentCategory === "All"
											? theme.palette.primary.main
											: "none",
									color: currentCategory === "All" ? "#fff" : "inherit",
									"&:hover": {
										backgroundColor:
											currentCategory === "All"
												? theme.palette.primary.main
												: "#fb625d5d",
										color: "#fff",
									},
								}}>
								All Categories
							</ListItem>
							{categories.map((category, index) => (
								<ListItem
									key={index}
									onClick={() => handleCategoryClick(category)}
									sx={{
										backgroundColor:
											currentCategory === category
												? theme.palette.primary.main
												: "none",
										color: currentCategory === category ? "#fff" : "inherit",
										"&:hover": {
											backgroundColor:
												currentCategory === category
													? theme.palette.primary.main
													: "#fb625d5d",
											color: currentCategory === category ? "#fff" : "inherit",
										},
									}}>
									{category}
								</ListItem>
							))}
						</List>
					</Box>

					{/* Mobile  */}

					<Box sx={{ display: { xs: "flex", md: "none" }, gap: 2, mb: 2 }}>
						<TextField
							placeholder="Search books..."
							variant="outlined"
							sx={{
								width: "100%",
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
						<IconButton
							id="basic-button"
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}>
							<FaFilter color={theme.palette.primary.main} />
						</IconButton>

						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							sx={{ mt: 1 }}
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
							<Box sx={{ minWidth: 200, p: 2 }}>
								<Typography mb={3} sx={{ fontWeight: 600 }}>
									Categories
								</Typography>
								<MenuItem
									key="all"
									onClick={() => {
										handleClose();
										handleCategoryClick("All");
									}}
									sx={{
										backgroundColor:
											currentCategory === "All"
												? theme.palette.primary.main
												: "none",
										color: currentCategory === "All" ? "#fff" : "inherit",
										"&:hover": {
											backgroundColor:
												currentCategory === "All"
													? theme.palette.primary.main
													: "#fb625d5d",
											color: "#fff",
										},
									}}>
									All Categories
								</MenuItem>
								{categories.map((category, index) => (
									<MenuItem
										key={index}
										onClick={() => {
											handleClose();
											handleCategoryClick(category);
										}}
										sx={{
											backgroundColor:
												currentCategory === category
													? theme.palette.primary.main
													: "none",
											color: currentCategory === category ? "#fff" : "inherit",
											"&:hover": {
												backgroundColor:
													currentCategory === category
														? theme.palette.primary.main
														: "#fb625d5d",
												color:
													currentCategory === category ? "#fff" : "inherit",
											},
										}}>
										{category}
									</MenuItem>
								))}
							</Box>
						</Menu>
					</Box>

					{/* Products  */}

					{loading ? (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: {
									xs: "1fr 1fr",
									sm: "1fr 1fr 1fr",
									md: "1fr 1fr 1fr 1fr",
								},
								gap: 3,
							}}>
							{[...Array(16)].map((_, index) => {
								return <ProductTemplateLoading key={index} />;
							})}
						</Box>
					) : (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: {
									xs: "1fr 1fr",
									sm: "1fr 1fr 1fr",
									md: "1fr 1fr 1fr 1fr",
								},
								gap: 3,
							}}>
							{currentProducts.length > 0 ? (
								currentProducts.map((item) => (
									<ProductTemplate key={item.objectId} item={item} />
								))
							) : (
								<p>No products to display.</p>
							)}
						</Box>
					)}
				</Box>

				<Pagination
					shape="rounded"
					count={Math.ceil(filteredProducts.length / productsPerPage)}
					page={currentPage}
					onChange={(event, value) => paginate(value)}
					sx={{ mt: 3, display: "flex", justifyContent: "center" }}
				/>
			</Container>
		</Box>
	);
}

export default LandingPage;
