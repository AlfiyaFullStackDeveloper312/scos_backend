const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

const authMiddleware = (requiredType = null) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, SECRET);

      if (requiredType && decoded.token_type !== requiredType) {
        return res.status(401).json({
          success: false,
          message: "Invalid token type",
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};

module.exports = authMiddleware;