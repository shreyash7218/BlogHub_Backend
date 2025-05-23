const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;