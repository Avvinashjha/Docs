import { CreateUser } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";


export class UserController {
  static getAllUsers = (req, res) => {
    const users = UserService.getAllUser();
    res.json({ users: users });
  };
  static getUserById = (req, res) => {
    const users = UserService.getUserById();
    res.json({ users: users || "NA" });
  };

  static registerUser = (req, res) => {
    const newUser = JSON.parse(JSON.stringify(CreateUser));
    const {name, email, password} = req.body;
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    UserService.addNewUser(newUser);
    res.json(newUser)
  }
}
