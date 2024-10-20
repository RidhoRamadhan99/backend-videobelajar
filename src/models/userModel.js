import pool from "../config/database.js";

export const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM `user`");
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM `user` WHERE `user_id` = ?", [
    id,
  ]);
  return rows[0];
};

export const createUser = async (userData) => {
  const { name, email, phone, gender } = userData;
  const [result] = await pool.query(
    "INSERT INTO `user` (name, email, phone, gender) VALUES (?, ?, ?, ?)",
    [name, email, phone, gender]
  );
  return getUserById(result.insertId);
};

export const updateUser = async (id, userData) => {
  const { name, email, phone, gender } = userData;
  await pool.query(
    "UPDATE `user` SET `name` = ?, `email` = ?, `phone` = ?, `gender` = ? WHERE `user_id` = ?",
    [name, email, phone, gender, id]
  );
  return getUserById(id);
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM `user` WHERE `user_id` = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};
