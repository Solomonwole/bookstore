import { CircularProgress } from "@mui/material";
import React from "react";
import { theme } from "../../components/mui/theme";

function Preloader({ mode }) {
	return (
		<>
			<CircularProgress
				size={20}
				sx={{ color: mode === "primary" ? theme.palette.primary.main : "#fff" }}
			/>
		</>
	);
}

export default Preloader;
