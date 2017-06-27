const pg = require('./knex')

function adduserdata(obj){
  return pg('user_data').insert(obj)
}



module.exports = {
  adduserdata
}
