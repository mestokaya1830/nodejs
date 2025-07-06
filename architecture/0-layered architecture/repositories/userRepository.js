const users = []; // Geçici bellek

export const getAllUsers = () => users;

export const createUser = (user) => {
  users.push(user);
  return user;
};

