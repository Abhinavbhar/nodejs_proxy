import jwt from "jsonwebtoken";

const checkLogin = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Unauthorized access." });
  }

  const token = authHeader.split(" ")[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Invalid token format. Unauthorized access." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token. Unauthorized access." });
  }
};

export default checkLogin;
