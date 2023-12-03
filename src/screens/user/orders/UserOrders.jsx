import {
	Box,
	Button,
	Container,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Parse from "../../../api/ApiCOnfig";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../../utils/constants/FormattedDate";

function UserOrders() {
	const navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const currentUser = Parse.User.current();
	const [orders, setOrders] = React.useState([]);
	const [fetchingOrders, setFetchingOrders] = useState(true);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleDownload = (linkDownload, title) => {
		// Replace '/path/to/your/file.txt' with the actual path to your file
		const filePath = linkDownload;

		// Create a temporary link element
		const link = document.createElement("a");

		// Set the href and download attributes
		link.href = filePath;
		link.download = title; // Set the desired name for the downloaded file
		link.target = "_blank";

		// Append the link to the document
		document.body.appendChild(link);

		// Simulate a click to trigger the download
		link.click();

		// Remove the link from the document
		document.body.removeChild(link);
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				if (!currentUser) {
					// Redirect to login if not logged in
					navigate("/login");
					return;
				}

				// Create a new Parse Query for the "Orders" class
				const Order = Parse.Object.extend("OrderItems");
				const query = new Parse.Query(Order);

				query.equalTo("user", currentUser);
				query.descending("createdAt");

				const results = await query.find();

				// Extract the data from Parse objects
				const ordersData = results.map((order) => order.toJSON());
				console.log(ordersData);
				setOrders(ordersData);
				setFetchingOrders(false);
			} catch (error) {
				console.log(error);
				setFetchingOrders(false);
			}
		};

		fetchOrders();
	}, [currentUser, navigate]);
	return (
		<>
			<Container maxWidth="lg">
				<Box mt={3} mb={5}>
					<Typography mb={5} variant="h1">
						Orders
					</Typography>

					<Paper sx={{ width: "100%", overflow: "hidden" }}>
						<TableContainer>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								{fetchingOrders ? (
									<TableBody>
										{rows
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((index) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1}>
														<TableCell>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell sx={{ textTransform: "uppercase" }}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell sx={{ textTransform: "capitalize" }}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell sx={{ textTransform: "capitalize" }}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
														<TableCell>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem" }}
															/>
														</TableCell>
													</TableRow>
												);
											})}
									</TableBody>
								) : (
									<>
										{orders.length > 0 ? (
											<TableBody>
												{orders
													.slice(
														page * rowsPerPage,
														page * rowsPerPage + rowsPerPage
													)
													.map((order, index) => {
														const linkDownload = order.product.productFile.url;
														const title = order.product.productFile.name;

														return (
															<TableRow hover role="checkbox" tabIndex={-1}>
																<TableCell>{index + 1}</TableCell>
																<TableCell sx={{ textTransform: "uppercase" }}>
																	{order.objectId}
																</TableCell>
																<TableCell>
																	{formatDateString(order.createdAt)}
																</TableCell>
																<TableCell>
																	{order.product.productTitle}
																</TableCell>
																<TableCell>
																	${order.product.productPrice}
																</TableCell>
																<TableCell sx={{ textTransform: "capitalize" }}>
																	{order.product.productAuthor}
																</TableCell>
																<TableCell sx={{ textTransform: "capitalize" }}>
																	{order.product.productCategory}
																</TableCell>
																<TableCell>
																	<Button
																		onClick={() =>
																			handleDownload(linkDownload, title)
																		}>
																		Download
																	</Button>
																</TableCell>
															</TableRow>
														);
													})}
											</TableBody>
										) : (
											<TableBody>
												<TableRow hover role="checkbox" tabIndex={-1}>
													<TableCell colSpan={8}>
														<Typography
															sx={{ textAlign: { xs: "left", md: "center" } }}>
															You haven&apos;t made any purchase
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										)}
									</>
								)}
							</Table>
						</TableContainer>
						{!fetchingOrders && orders.length > 0 && (
							<TablePagination
								rowsPerPageOptions={[10, 15, 20]}
								component="div"
								count={orders.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						)}
					</Paper>
				</Box>
			</Container>
		</>
	);
}

export default UserOrders;

const columns = [
	{ id: "number", label: "", minWidth: 20 },
	{ id: "order", label: "BOOK ID", minWidth: 170 },
	{ id: "date", label: "DATE", minWidth: 170 },
	{
		id: "title",
		label: "TITLE",
		minWidth: 170,
	},
	{
		id: "amount",
		label: "AMOUNT",
		minWidth: 170,
	},
	{
		id: "author",
		label: "AUTHOR",
		minWidth: 170,
	},
	{
		id: "category",
		label: "CATEGORY",
		minWidth: 170,
	},
	{
		id: "action",
		label: "Action",
		minWidth: 170,
	},
];

const rows = Array.from({ length: 10 }, () => ({}));
