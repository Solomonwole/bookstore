import { Box, Container, Skeleton, Stack } from "@mui/material";
import React from "react";

function ProductDetailsLoader() {
	return (
		<>
			<Container maxWidth="lg">
				<Box sx={{ display: { xs: "block", md: "flex" }, gap: 3, mt: 5 }}>
					<Skeleton
						variant="rectangular"
						sx={{
							width: { xs: "100%", md: "405px" },
							height: { xs: "400px", md: "380px" },
							border: "1px solid #00000028",
							p: 1,
						}}
					/>

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
								<Stack spacing={1}>
									<Skeleton variant="rectangular" width={190} height={40} />
									<Skeleton variant="rectangular" width={150} height={20} />
									<Skeleton variant="rectangular" width={150} height={20} />
								</Stack>
							</Box>

							{/* Add to cart  */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-start",
									alignItems: "flex-end",
									flexDirection: "column",
								}}>
								<Skeleton variant="rectangular" width={150} height={40} />
							</Box>
						</Box>
						<Box mt={5}>
							<Stack spacing={3}>
								<Stack spacing={1}>
									<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
									<Skeleton
										variant="text"
										sx={{ fontSize: "1rem", maxWidth: "90%" }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: "1rem", maxWidth: "80%" }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: "1rem", maxWidth: "70%" }}
									/>
								</Stack>
								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									<Skeleton variant="rectangular" width={150} height={40} />
								</Box>
							</Stack>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default ProductDetailsLoader;
