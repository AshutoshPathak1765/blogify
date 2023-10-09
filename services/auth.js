const JWT = require("jsonwebtoken");
const secretKey = "$ashu@1999";
function createTokenCookie(user) {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return JWT.sign(payload, secretKey);
}

function validateToken(token) {
  return JWT.verify(token, secretKey);
}

module.exports = {
  createTokenCookie,
  validateToken,
};
