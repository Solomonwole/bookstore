import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from "react-router-dom";
import LandingPage from "../screens/landing/LandingPage";
import Header from "../components/header/Header";
import LoginPage from "../auth/login/LoginPage";
import SignUpPage from "../auth/signup/SignUpPage";
import ProductDetails from "../screens/productPage/ProductDetails";
import Checkout from "../screens/checkout/Checkout";
import UserOrders from "../screens/user/orders/UserOrders";
import ProtectedRoute from "../utils/protectedRoute/ProtectedRoute";
import ForgotPage from "../auth/forgot/ForgotPage";

function RouterPage() {
	const { localpath } = useParams();
	const excludedPaths = ["login", "signup", "forgot-password"];
	const isHeaderVisible = !excludedPaths.includes(localpath);
	return (
		<Router>
			{isHeaderVisible && <Header />}
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route exact path="/login" element={<LoginPage />} />
				<Route exact path="/signup" element={<SignUpPage />} />
				<Route exact path="/forgot-password" element={<ForgotPage />} />

				<Route path="/products/:productTitle" element={<ProductDetails />} />
				<Route path="/checkout" element={<Checkout />} />

				<Route
					path="/user-orders"
					element={
						<ProtectedRoute>
							<UserOrders />
						</ProtectedRoute>
					}
				/>

				<Route exact path="*" element={<LandingPage />} />
			</Routes>
		</Router>
	);
}

export default RouterPage;
