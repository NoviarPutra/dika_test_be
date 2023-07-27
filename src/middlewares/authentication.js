const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");

config();
module.exports = {
  authToken: (req, res, next) => {
    const headers = req.headers;
    const token = headers.authorization && headers.authorization.split(" ")[1];
    if (token === null)
      return res.status(403).json({ message: "Token is null" });
    verify(token, process.env.SECRET_ACCESS, (error, decoded) => {
      if (error) return res.status(403).json({ message: "ACCESS DENIED" });

      req.user = decoded;
      next();
    });
  },
};
