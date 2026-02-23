import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // ────────────────────────────────────────────────
    // 1. Extract token — support both common patterns
    // ────────────────────────────────────────────────
    let token;

    // Most common: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Fallback: if someone still sends custom header (your old style)
    if (!token && req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. No token provided. Please login again.',
      });
    }

    // ────────────────────────────────────────────────
    // 2. Verify token
    // ────────────────────────────────────────────────
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: you can add more checks here (e.g. user still exists, token blacklisted, etc.)
    // For now we just trust the signature + expiration

    // Attach to request — conventional place is req.user
    req.user = { id: decoded.id };   // or req.userId = decoded.id;
    // If your controllers expect req.body.userId, you can still do:
    // req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message, error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
      });
    }

    // Fallback for other unexpected errors
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Please login again.',
    });
  }
};

export default authUser;