import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckoutDetails from "./component/CheckoutDetails";
import ThankYou from "./component/ThankYou";

function Checkout() {
	const [orderCompleted, setOrderCompleted] = useState(false);
	const [orderedProducts, setOrderedProducts] = useState([]);
	return (
		<>
			<Container maxWidth="lg">
				<Box mt={3} mb={5}>
					<Typography variant="h1">Checkout</Typography>
				</Box>

				<Box>
					{!orderCompleted ? (
						<CheckoutDetails
							setOrderCompleted={setOrderCompleted}
							setOrderedProducts={setOrderedProducts}
						/>
					) : (
						<ThankYou item={orderedProducts} />
					)}
				</Box>
			</Container>
		</>
	);
}

export default Checkout;
