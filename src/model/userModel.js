const db = require('../config/database');

async function getAllUsers() {
    const [rows] = await db.query('SELECT * FROM signup');
    return rows;
  }

  async function getUserById(userid){
    const [rows] = await db.query('SELECT * FROM signup WHERE id = ?',[ userid]);
    return rows;
  }

  const deleteUser = async(userid) => {
    const [rows] = await db.query('DELETE FROM signup WHERE id =?',[userid]);
      
    if (rows.affectedRows === 0) {
        return null;  // No rows affected, meaning no user was deleted (user might not exist)
    }
    
    return { message: 'User deleted successfully' };
  }

  const updateUser = async (userId, userData) => {
    const { fname, username, password } = userData;
    const [result] = await db.query(
        'UPDATE signup SET fname = ?, username = ?, password = ? WHERE id = ?',
        [fname, username, password, userId]
    );
    if (result.affectedRows === 0) {
        return null;
    }
    return userData; 
};

  const createUser = async(userData) => {
    const {fname , username , password} = userData;
    const row = db.query('INSERT INTO signup (fname , username ,password) VALUES (?,?,?)',[fname,username , password]);
    return row;
  }
  module.exports ={
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    createUser
  }