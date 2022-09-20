const jwt = require("jsonwebtoken");
const jwtSecret = "hfduhfsdfhsdksdff";

module.exports = function(req, res, next) {
  const bearToken = req.headers['authorization'];
  try {
      if(bearToken != undefined) {
        const arrToken = bearToken.split(" ");
        const token = arrToken[1];
        const decoded = jwt.verify(token, jwtSecret);
        if(decoded.role == "1") {
          next();
        } else {
          res.status(401).json({err: "Você não tem permissão para acessar essa área"})
        }
      } else {
        res.status(404).json({err: "Token inválido"})
      }
  } catch (err) {
    res.status(401).json({err: "Token inválido"})
  }

}