/* Modules */
import { Router } from "express";
import jwt from "jsonwebtoken";

/* Import Config File */
import { config } from "../config";

/* Import Models */
import user_model from "../models/user";

/* Router Middlewares */
import { verify_token } from "./verify_token";

/* Init Router */
const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = new user_model({
      username,
      email,
      password
    });

    user.password = await user.encrypt_password(user.password);

    await user.save();

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24
    });

    console.log(user);
    res.json({ auth: true, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await user_model.findOne({ email });

  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }

  const valid_password = await user.validate_password(password);

  if (!valid_password) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ auth: true, token });
});

router.get("/dashboard", verify_token, async (req, res, next) => {
  const user = await user_model.findById(req.user_id, { password: 0 });

  if (!user) {
    return res.status(404).send("No user found");
  }

  console.log(user);
  res.json(user);
});

router.get("/me", verify_token, async (req, res, next) => {
  res.json("me");
});

export default router;
