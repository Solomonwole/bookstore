import { createContext, useContext, useEffect, useState } from "react";
import Parse from "../api/ApiCOnfig";

const siteContext = createContext();

export function useSiteContext() {
	return useContext(siteContext);
}

export function SiteProvider({ children }) {
	const [searchText, setSearchText] = useState("");
	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
	});
	const [cart, setCart] = useState([]);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	// Cart
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
		setCart(storedCart);
	}, []);

	//   Get current user
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await Parse.User.current();
				if (response) {
					setUserData(response.toJSON());
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);
	const userLogout = async () => {
		try {
			await Parse.User.logOut().then(() => {
				setUserData({});
			});
		} catch (error) {
			console.error("Error logging out user:", error);
		}
	};

	const handleAlertClose = () => {
		setIsAlertOpen(false);
	};
	const handleAlertOpen = () => {
		setIsAlertOpen(true);
	};

	const value = {
		userData,
		setUserData,
		cart,
		setCart,
		searchText,
		setSearchText,
		userLogout,
		products,
		setProducts,
		filteredProducts,
		setFilteredProducts,

		alertMessage,
		alertSeverity,
		isAlertOpen,
		handleAlertClose,
		setAlertMessage,
		setAlertSeverity,
		handleAlertOpen,
	};

	return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
}
