import jwt from "jsonwebtoken";
import User from '../models/userModel.js'
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        token = req.headers.authorization.split(" ")[1];
            if (token) {
              try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                  req.user = await User.findById(decoded.id).select("-password");
                    next();
               
              } catch (err) {
                  res.status(401)
                throw new Error("Invalid Token");
              }
        }
            else {
                res.status(401)
                throw new Error("No token provided")
        }
    }
  

})

export {protect}
