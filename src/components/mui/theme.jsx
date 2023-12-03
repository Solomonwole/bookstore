import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#FB635D",
		},
		secondary: {
			main: "#fff",
		},
		background: {
			default: "#f8f9fa",
		},
		text: {
			primary: "#333333",
			secondary: "#757575",
		},
		grey: {
			main: "rgba(0, 0, 0, 0.48)",
			dark: "#A0A0A0",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	typography: {
		h1: {
			fontSize: "2.5rem",
			fontWeight: 400,
			fontFamily: "Righteous",
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 600,
			fontFamily: "Mulish",
		},
		body1: {
			fontSize: "16px",
			fontWeight: 400,
			fontFamily: "Mulish",
		},
		caption: {
			fontSize: "14px",
			fontWeight: 400,
			fontFamily: "Mulish",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
					textTransform: "none",
					padding: "5px 40px",
				},
				contained: {
					boxShadow: "none",
					color: "#fff",
					background: "#FB635D",
					borderRadius: 0,
					"&:hover": {
						boxShadow: "none",
						background: "#FB635D",
						color: "#fff",
					},
				},
				outlined: {
					border: "2px solid #FB635D",
					boxShadow: "none",
					color: "#FB635D",
					background: "transparent",
					borderRadius: 0,
					"&:hover": {
						boxShadow: "none",
						background: "transparent",
						color: "#FB635D",
						border: "2px solid #FB635D",
						borderRadius: 0,
					},
				},
				text: {
					color: "#FB635D",
					boxShadow: "none",
					background: "transparent",
					border: "none",
					padding: 0,
					margin: 0,
					display: "flex",
					justifyContent: "end",
					"&:hover": {
						color: "#FB635D",
						boxShadow: "none",
						background: "transparent",
						border: "none",
						padding: 0,
						margin: 0,
						display: "flex",
						justifyContent: "end",
					},
				},
			},
		},
	},
	spacing: 8,
	// shadows: [
	// 	"none",
	// 	"0px 2px 4px rgba(0, 0, 0, 0.1)",
	// 	"0px 4px 8px rgba(0, 0, 0, 0.1)",
	// 	"0px 8px 16px rgba(0, 0, 0, 0.1)",
	// ],
});
