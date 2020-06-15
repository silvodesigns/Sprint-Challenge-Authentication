const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
  findBy,
};

async function insert(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users').where({id}).first();
}

function remove(id) {
  return db('users').where({id}).del();
}

function getAll() {
  return db('users');
}

function findById(id) {
  return db('users')
  .where({ id })
  .first();
}

function findBy(filter){
  return db('users').where(filter);
  
}