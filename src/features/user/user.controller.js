import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new UserModel(name, email, hashedPassword, gender);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect credentials");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          //creating JWT Token

          //secret key is a random key copied from random key generate website
        //   const token = jwt.sign(
        //     { userID: user._id, email: user.email },
        //     process.env.JWT_SECRET,
        //     {
        //       expiresIn: "1h",
        //     }
        //   );
          return res.status(200).send("User Logged Inn successfully");
        } else {
          return res.status(400).send("Incorrect credentials");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong in signIn");
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword, email } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    try {
      await this.userRepository.resetPassword(email, hashedPassword);
      res.status(200).send("Password is updated");
    } catch (error) {
      console.log(error);
      console.log("Something went Wrong while resetting the password");
      next(error);
    }
  }
}
