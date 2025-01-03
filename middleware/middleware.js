// // Desc: Middleware to verify jwt token
// import { connectDB } from "../connections";
// import jwt from "jsonwebtoken";
// import { asyncHandler } from "../utils/asyncHandler";

// const middleware = asyncHandler(async (req, res,next) => {
//     try {
//         await connectDB();
//         const token = req.headers.authorization || null;
//         if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//         }
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Unauthorized user " });
//     }
// });
    
// export default  middleware ; 

