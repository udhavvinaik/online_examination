// Correct way to export the role middleware
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};

// Export as named export
module.exports = roleMiddleware;