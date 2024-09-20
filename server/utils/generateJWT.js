const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET_KEY || 'your-secret-key',
    { expiresIn: '1m' }
  );
};

module.exports = generateJWT;


