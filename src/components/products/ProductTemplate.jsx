import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductTemplate({ item }) {
	const navigate = useNavigate();
	return (
		<>
			<Box
				p={1}
				sx={{
					minWidth: "100%",
					cursor: "pointer",
					"&:hover": {
						boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.096)",
					},
				}}
				onClick={() => {
					navigate(`/products/${item.productTitle.replace(/\s+/g, "-")}`);
					window.scrollTo(0, 0);
				}}>
				<Stack
					spacing={1}
					direction="column"
					justifyContent="center"
					alignItems="center">
					<Box
						sx={{
							// width: 173,
							width: "100%",
							height: 240,
						}}>
						<img
							src={item.productImage.url}
							alt=""
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					</Box>
					<Stack>
						<Typography align="center" sx={{ fontWeight: 600 }}>
							{item.productTitle}
						</Typography>
						<Typography align="center" variant="caption" color="grey.dark">
							{item.productAuthor}
						</Typography>
						<Typography align="center" variant="caption" color="primary">
							${item.productPrice}
						</Typography>
					</Stack>
				</Stack>
			</Box>
		</>
	);
}

export default ProductTemplate;

export function ProductTemplateLoading() {
	return (
		<>
			<Box p={1} width="100%">
				<Stack
					width="100%"
					spacing={1}
					direction="column"
					justifyContent="center"
					alignItems="center">
					<Skeleton
						variant="rectangular"
						width={{ xs: "100%", md: 200 }}
						height={240}
						sx={{
							width: { xs: "100%", md: 200 },
						}}
					/>
					<Stack
						mt={1}
						spacing={1}
						direction="column"
						justifyContent="center"
						alignItems="center">
						<Skeleton variant="rectangular" width={150} height={13} />
						<Skeleton variant="rectangular" width={120} height={13} />
						<Skeleton variant="rectangular" width={50} height={13} />
					</Stack>
				</Stack>
			</Box>
		</>
	);
}
