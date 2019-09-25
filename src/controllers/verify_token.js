/* Modules */
import jwt from "jsonwebtoken";

/* Import Config File */
import { config } from "../config";

export function verify_token(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided"
    });
  }

  const decoded = jwt.verify(token, config.secret);

  req.user_id = decoded.id;

  next();
}
