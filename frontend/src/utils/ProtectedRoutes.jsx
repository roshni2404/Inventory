import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, requiredRole = [] }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
            navigate("/unauthorized");
            return;
        }
    }, [user, navigate, requiredRole]);

    if (!user) return null;
    if (requiredRole.length > 0 && !requiredRole.includes(user.role)) return null;

    return children;
};

export default ProtectedRoutes;
