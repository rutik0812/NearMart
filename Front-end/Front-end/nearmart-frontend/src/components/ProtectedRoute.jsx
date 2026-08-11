import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token =
        localStorage.getItem("token");

    const userRole =
        localStorage.getItem("role");


    // ==========================
    // NOT LOGGED IN
    // ==========================

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ==========================
    // WRONG ROLE
    // ==========================

    if (
        role &&
        userRole !== role
    ) {

        if (
            userRole === "CUSTOMER"
        ) {

            return (
                <Navigate
                    to="/customer-dashboard"
                    replace
                />
            );

        }


        if (
            userRole === "SHOP_OWNER"
        ) {

            return (
                <Navigate
                    to="/shop-dashboard"
                    replace
                />
            );

        }


        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;

}

export default ProtectedRoute;