const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decryptedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decryptedObj;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        console.error(error); // Log the error for debugging
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = validateToken;
