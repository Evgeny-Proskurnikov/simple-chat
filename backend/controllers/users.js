const users = [];

// добавление нового пользователя в массив
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // определяем существует ли имя пользователя в текущей комнате 
  const existingUser = users.find((user) => user.room === room && user.name === name);

  // если имя или комната пустые возвращаем ошибку
  // если пользователь существует возвращаем ошибку
  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  // если ошибки нет, то создаем объект пользователя и записываем в массив
  const user = { id, name, room };
  users.push(user);

  return { user };
}

// удаление пользователя 
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // если пользователь найден, удаляем и возвращаем удалённого пользователя
  if(index !== -1) return users.splice(index, 1)[0];
}

// возвращаем найденного по ID пользователя
const getUser = (id) => users.find((user) => user.id === id);

// возвращаем массив пользователей комнаты
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
