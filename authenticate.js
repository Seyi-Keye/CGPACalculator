var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
/*
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
*/
function generateToken(user) {
  return jwt.sign({
    UserId: user.id,
    RoleId: user.roleId,
    username: user.username
  }, process.env.SECRET, { expiresIn: '1 day' });
}

/**
 * Hash user's password
 * @method
 * @param string password
 * @returns {void} no return
 */
function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

module.exports = {
  generateToken, hashPassword
}