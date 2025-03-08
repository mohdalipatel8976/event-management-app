const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    try {
        let token = req.cookies.token;  // ✅ Try getting token from cookies
        if (!token) {
            token = req.header("Authorization")?.split(" ")[1];  // ✅ Also allow Authorization header
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decryptedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decryptedObj;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        console.error(error); // Log the error for debugging
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = validateToken;
