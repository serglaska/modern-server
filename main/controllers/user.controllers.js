const db = require('../db');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { name, surname } = req.body;
      const newPerson = await db.query('INSERT INTO vms_user (name, surname) values ($1, $2) RETURNING *', [
        name,
        surname
      ]);
      res.json(newPerson.rows[0]);
    } catch (e) {
      next(e);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await db.query('SELECT * FROM  vms_user');
      res.json(users.rows);
    } catch (e) {
      next(e);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await db.query('SELECT * FROM  vms_user where id = $1', [id]);
      res.json(user.rows);
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id, name, surname } = req.body;
      const updateUserById = await db.query(
        'UPDATE vms_user set name = $1, surname = $2 where $3 = id RETURNING *',
        [
          name,
          surname,
          id
        ]
      );
      res.json(updateUserById);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await db.query('DELETE FROM vms_user where id = $1', [id]);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
};
