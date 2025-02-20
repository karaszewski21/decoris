const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

class AuthJwt {
  verifyToken(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = new AuthJwt();
