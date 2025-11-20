export class UserService {
  static users = [];
  static getAllUser = () => {
    return this.users;
  };

  static addNewUser = (user) => {
    this.users.push(user);
  }

  static getUserById = (id) => {
    return this.users.find((u) => u.id === id);
  };
}
