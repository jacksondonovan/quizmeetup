const pg = require('./knex')

function adduserdata(obj){
  return pg('user_data').insert(obj)
}

function allquizzes(){
  return pg('user_quizzes').select()
}

function addquiz(obj){
  return pg('user_quizzes').insert(obj)
}

module.exports = {
  adduserdata,
  allquizzes,
  addquiz
}
