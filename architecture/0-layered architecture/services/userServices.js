import { getAllUsers, createUser } from '../repositories/userRepository.js';
import User from '../models/userModel.js';

export const addUser = (name) => {
  const id = Date.now().toString();
  const user = new User(id, name);
  return createUser(user);
};

export const listUsers = () => {
  return getAllUsers();
};


