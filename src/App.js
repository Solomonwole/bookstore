import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import RouterPage from "./router/RouterPage";
import { theme } from "./components/mui/theme";
import { useSiteContext } from "./context/UserContext";
import Parse from "./api/ApiCOnfig";
import { useEffect } from "react";

function App() {
	const { alertMessage, alertSeverity, isAlertOpen, handleAlertClose } =
		useSiteContext();

	useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = Parse.User.current();

				if (currentUser) {
					return null;
				} else {
					Parse.User.logOut();
				}
			} catch (error) {
				console.log(error);
			}
		};

		checkUser();
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={isAlertOpen}
				autoHideDuration={3000}
				onClose={handleAlertClose}>
				<Alert
					onClose={handleAlertClose}
					severity={alertSeverity}
					sx={{ width: "100%" }}>
					{alertMessage}
				</Alert>
			</Snackbar>
			<RouterPage />
		</ThemeProvider>
	);
}

export default App;
