import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../../utils/constants/FormattedDate";

function ThankYou({ item }) {
	const navigate = useNavigate();
	return (
		<>
			<Box>
				<Stack spacing={4}>
					<Typography>Thank you. Your order has been received.</Typography>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
							gap: 3,
						}}>
						<Stack sx={{ borderRight: "1px dashed #000" }}>
							<Typography variant="caption" color="grey.dark">
								ORDER NUMBER
							</Typography>
							<Typography
								sx={{ textTransform: "uppercase", fontWeight: 600 }}
								variant="body1">
								{item.objectId}
							</Typography>
						</Stack>

						{/* Date  */}
						<Stack sx={{ borderRight: { xs: "none", md: "1px dashed #000" } }}>
							<Typography variant="caption" color="grey.dark">
								DATE
							</Typography>
							<Typography sx={{ fontWeight: 600 }} variant="body1">
								{formatDateString(item.createdAt)}
							</Typography>
						</Stack>

						{/* Total  */}
						<Stack sx={{ borderRight: "1px dashed #000" }}>
							<Typography variant="caption" color="grey.dark">
								TOTAL
							</Typography>
							<Typography
								sx={{ textTransform: "uppercase", fontWeight: 600 }}
								variant="body1">
								${item.totalAmount}
							</Typography>
						</Stack>

						{/* Payment Method  */}
						<Stack>
							<Typography variant="caption" color="grey.dark">
								PAYMENT METHOD
							</Typography>
							<Typography sx={{ fontWeight: 600 }} variant="body1">
								Bank Transfer
							</Typography>
						</Stack>
					</Box>
				</Stack>

				<Box mt={5}>
					<Button
						sx={{ height: "50px" }}
						variant="contained"
						onClick={() => navigate("/user-orders")}>
						View Orders
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default ThankYou;
