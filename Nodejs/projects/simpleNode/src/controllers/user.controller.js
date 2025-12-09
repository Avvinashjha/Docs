import { UserService } from "../services/user.service.js";
import { simpleResponse } from "../utils/helperResponse.js";
import bcrypt from "bcrypt";
const password_hash_secret = "some_password_secret";
export class UserController {
  static async getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(
            simpleResponse(false, "Failed to fetch all user")
        ) 
    }
  }

  static async getUserById (req, res){
    try {
        const userId = parseInt(req.params.id);
        if(isNaN(userId)){
            return res.status(400).json(simpleResponse(false, "Invalid user id."));
        }
        const users = await UserService.getUserById(userId);
        if(users.length === 0){
            return res.json(simpleResponse(true, "User with " + userId + " not found."))
        }
        res.status(200).json({
            message: "Fetched user",
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(simpleResponse(false, "Not able to find user with id"));
    }
  }

  static async createUser (req, res) {
    const {name, email, password} = req.body;
    const hashed_password = await bcrypt.hash(password,  2);
    const {isCreated, id} = await UserService.addUser({name, email, password: hashed_password});

    if(!isCreated){
        return res.status(400).json(simpleResponse(false, "Not able to create user"))
    }
    res.status(201).json({
        userId: 1,
        message: "User created successfully"
    })
  }
}
