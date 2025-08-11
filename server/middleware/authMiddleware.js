// // import jwt from 'jsonwebtoken';
// // import User from '../models/User.js';

// // const authMiddleware = async (req, res, next) => {
// //     try {
// //         const token = req.headers.authorization.split(" ")[1];
// //         if (!token) {
// //             return res.status(401).json({ success: false, message: 'No token proided' });
// //         }

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //         if(!decoded) {
// //             return res.status(401).json({ success: false, message: 'Invalid token' });
// //         }

// //         const user = await User.findById({_id: decoded.id});

// //         if (!user) {
// //             return res.status(404).json({ success: false, message: 'User not found' });
// //         }
// //         req.user = user;
// //         next();
// //     } catch(error) {
// //         console.error('Error in authMiddleware:', error);
// //         return res.status(500).json({ success: false, message: ' Internal server error in middleware' });
// //     }




// //     }
// // export default authMiddleware;







// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const authMiddleware = async (req, res, next) => {
//     try {
//         // Check if token exists
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ success: false, message: "No token provided" });
//         }

//         // Extract token
//         const token = authHeader.split(" ")[1];

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({ success: false, message: "Invalid token" });
//         }

//         // Find user
//         const user = await User.findById(decoded.id); // ✅ Correct usage
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Error in authMiddleware:", error);

//         if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "Invalid or expired token" });
//         }

//         return res.status(500).json({ success: false, message: "Internal server error in middleware" });
//     }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Token check
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // 2️⃣ Token split
        const token = authHeader.split(" ")[1];

        // 3️⃣ Token verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ User find
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 5️⃣ Request में user save
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;
