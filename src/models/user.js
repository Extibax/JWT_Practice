/* Modules */
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const user_schema = new Schema({
  username: String,
  email: String,
  password: String
});

user_schema.methods.encrypt_password = async password => {
  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hash(password, salt);

  return hash;
};

user_schema.methods.validate_password = async function(password) {
  const compare = bcrypt.compare(password, this.password);

  return compare;
};

export default model("user", user_schema);
