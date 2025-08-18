// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         const storedUser = localStorage.getItem("pos-user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     })
//     const login = (userData, token) => {
//         setUser(userData);
//         localStorage.setItem("pos-user", JSON.stringify(userData));
//         localStorage.setItem("pos-token", token);
//     }

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("pos-user");
//         localStorage.removeItem("pos-token");
//     }

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthContext);


// export default AuthProvider;







// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ App load hone par localStorage check karo
    useEffect(() => {
        const storedUser = localStorage.getItem("pos-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Login function
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("pos-user", JSON.stringify(userData));
        if (token) {
            localStorage.setItem("pos-token", token);
        }
    };

    // ✅ Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("pos-user");
        localStorage.removeItem("pos-token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Custom hook (easy import for components)
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
