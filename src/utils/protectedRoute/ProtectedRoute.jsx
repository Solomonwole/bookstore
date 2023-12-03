import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Parse from "../../api/ApiCOnfig";
function ProtectedRoute({ children }) {
	const currentUser = Parse.User.current();

	let location = useLocation();

	if (!currentUser) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
}

export default ProtectedRoute;
