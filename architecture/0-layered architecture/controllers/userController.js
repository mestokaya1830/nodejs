import { addUser, listUsers } from '../services/userServices.js';

export const createUserHandler = (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const user = addUser(name);
  res.status(201).json(user);
};

export const getUsersHandler = (req, res) => {
  const users = listUsers();
  console.log(users)
  res.json(users);
};

