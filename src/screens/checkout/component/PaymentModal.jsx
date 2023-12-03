import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Parse from "../../../api/ApiCOnfig";
import { useState } from "react";
import Preloader from "../../../utils/constants/Preloader";
import { Logo } from "../../../assets/Svgs";
import { useSiteContext } from "../../../context/UserContext";

function PaymentModal({ open, setOpen, amount, placeOrder, loading }) {
	const handleClose = () => setOpen(false);
	const [bankDetails, setBankDetails] = useState({});
	const [fetchingDetails, setFetchingDetails] = useState(true);
	const { setAlertMessage, setAlertSeverity, handleAlertOpen } =
		useSiteContext();

	const fetchBankDetails = async () => {
		try {
			const parseQuery = new Parse.Query("Bank");
			let result = await parseQuery.find();

			const bank = result.map((bank) => bank.toJSON());

			setBankDetails(bank[0]);
			setFetchingDetails(false);
		} catch (error) {
			console.log(error);
			setFetchingDetails(false);
		}
	};
	useEffect(() => {
		fetchBankDetails();
	}, []);

	const copyToClipboard = (text, message) => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					console.log("Text copied to clipboard");

					setAlertMessage(message);
					setAlertSeverity("success");
					handleAlertOpen();
				})
				.catch((error) => {
					console.error("Failed to copy text to clipboard:", error);
				});
		}
	};

	const copyAmountToClipboard = () => {
		copyToClipboard(`${amount}`, "Amount Copied");
	};

	const copyAccountNumber = () => {
		if (bankDetails && bankDetails.accountNumber) {
			copyToClipboard(bankDetails.accountNumber, "Account Number Copied");
		} else {
			console.error("Account number is undefined or null");
			// Handle the error or show a user-friendly message
		}
	};

	return (
		<>
			<Modal
				sx={{ background: "#5d1b1b" }}
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					{fetchingDetails ? (
						<Box
							flex={1}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								minHeight: "40vh",
								flexDirection: "column",
								gap: 2,
							}}>
							<Preloader mode="primary" />
							<Typography
								variant="caption"
								color="grey"
								sx={{ fontStyle: "italic" }}>
								Please wait...
							</Typography>
						</Box>
					) : (
						<>
							{bankDetails.accountNumber ? (
								<>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center">
										<Logo />
										<Stack direction="column" alignItems="end">
											<Typography sx={{ fontWeight: 600 }}>
												${amount}
											</Typography>
										</Stack>
									</Stack>

									<Box mt={3}>
										<Typography variant="body1">
											Proceed to your bank app to complete this transfer,
										</Typography>

										<Box
											mt={3}
											mb={3}
											sx={{
												border: "1px solid #EFEAE9",
												background: "#FFFDFB",
											}}>
											<Stack spacing={2.5} p={2}>
												<Stack spacing={0.8}>
													<Typography variant="caption" color="grey.dark">
														AMOUNT{" "}
													</Typography>
													<Typography
														variant="h3"
														sx={{
															fontWeight: 600,
															fontSize: "25px",
															display: "flex",
														}}>
														${amount} &nbsp;{" "}
														<Button
															onClick={copyAmountToClipboard}
															variant="contained"
															sx={{
																height: "30px",
																width: "15px",
																display: { xs: "none", md: "flex" },
															}}>
															Copy
														</Button>
													</Typography>
												</Stack>
												<Stack spacing={0.8}>
													<Typography variant="caption" color="grey.dark">
														ACCOUNT NUMBER{" "}
													</Typography>
													<Typography
														variant="h3"
														sx={{
															fontWeight: 600,
															fontSize: "25px",
															display: "flex",
														}}>
														{bankDetails.accountNumber} &nbsp;{" "}
														<Button
															onClick={copyAccountNumber}
															variant="contained"
															sx={{
																height: "30px",
																width: "15px",
																display: { xs: "none", md: "flex" },
															}}>
															Copy
														</Button>
													</Typography>
												</Stack>
												<Stack spacing={0.8}>
													<Typography variant="caption" color="grey.dark">
														BANK NAME{" "}
													</Typography>
													<Typography
														variant="h3"
														sx={{ fontWeight: 600, fontSize: "25px" }}>
														{bankDetails.bankName} &nbsp;{" "}
													</Typography>
												</Stack>
												<Stack spacing={0.8}>
													<Typography variant="caption" color="grey.dark">
														BENEFICIARY{" "}
													</Typography>
													<Typography
														variant="h3"
														sx={{ fontWeight: 600, fontSize: "25px" }}>
														{bankDetails.beneficiary} &nbsp;{" "}
													</Typography>
												</Stack>
												<Box sx={{ borderTop: "1px solid #EFEAE9", pt: 2 }}>
													<Typography>
														You don't have to make a transfer to complete the
														purchase as it hasn't been made mandatory, but if
														you wish to make the transaction, kindly go ahead.
													</Typography>
												</Box>
											</Stack>
										</Box>

										<Stack spacing={2}>
											{loading ? (
												<Button
													variant="contained"
													sx={{ height: "50px" }}
													fullWidth>
													<Preloader />
												</Button>
											) : (
												<Button
													variant="contained"
													sx={{ height: "50px" }}
													fullWidth
													onClick={placeOrder}>
													Proceed to Complete Order
												</Button>
											)}
											<Button
												variant="outlined"
												sx={{ height: "50px" }}
												fullWidth
												onClick={handleClose}>
												Cancel Order
											</Button>
										</Stack>
									</Box>
								</>
							) : (
								<Box
									flex={1}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
										minHeight: "40vh",
										flexDirection: "column",
										gap: 2,
									}}>
									<Typography
										variant="caption"
										color="grey"
										sx={{ fontStyle: "italic" }}>
										An Error Occurred, Please try again
									</Typography>
									<Button
										variant="contained"
										onClick={() => {
											setFetchingDetails(true);
											fetchBankDetails();
										}}>
										Reload
									</Button>
								</Box>
							)}
						</>
					)}
				</Box>
			</Modal>
		</>
	);
}

export default PaymentModal;

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 2,
	minHeight: "50vh",
	maxHeight: { xs: "85vh", md: "95vh" },
	overflow: "auto",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": {
		display: "none",
	},
};
