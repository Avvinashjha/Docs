import bcrypt from "bcrypt";
import { SignUpUser } from "../models/user.js";
import { UserService } from "../services/user.service.js";
import { simpleResponse } from "../utils/helperResponse.js";
import { isValidEmail, validatePassword } from "../utils/validation.js";

export class AuthController {
  static async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password);
      const newUser = {...SignUpUser};
      // name email and password should be there
      if (!name || !email || !password) {
        return res
          .status(400)
          .json(
            simpleResponse(
              false,
              "Name, email, and password is required fields."
            )
          );
      }
      // name length must be grater than 6
      if (name.length < 6) {
        return res
          .status(400)
          .json(simpleResponse(false, "Name length must be greater than 6."));
      }
      // user must have entered a valid email
      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json(simpleResponse(false, "Invalid email entered"));
      }
      // password length must be grater than 8
      if (password.length < 8) {
        return res
          .status(400)
          .json(
            simpleResponse(false, "password must be of length grater than 8.")
          );
      }
      newUser.email = email;
      newUser.password = await bcrypt.hash(password,  2);
      newUser.name = name;
      UserService.addUser(newUser);
      res.status(201).json(simpleResponse(true, "User created successfully"))
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }

  static async login(req, res) {
    // username + password -> true -> false
    const {username, password} = req.body;
    const users = await UserService.getUserByUsername(username);
    if(!users || users.length === 0){
      return res.status(404).json(simpleResponse(false, "Username is not present"));
    }
    const [user] = users;

    if(user.password !== password){
      return res.status(401).json(simpleResponse(false, "Incorrect password."));
    }

    res.cookie("auth_token", "abc123", {
      httpOnly: true,   // prevents JS access (important for security)
      secure: false,    // set true if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.json(users)
  }

  static resetPassword(req, res) {
    const body = req.body;
    res.json(body);
  }

  static changeInfo(req, res) {
    const body = req.body;
    res.json(body);
  }

  static logout(req, res) {
    const body = req.body;
    res.json(body);
  }
}
