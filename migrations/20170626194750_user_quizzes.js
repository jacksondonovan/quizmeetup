
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_quizzes',function(table){
    table.increments()
    table.string('question')
    table.string('answer_one')
    table.string('answer_two')
    table.string('answer_three')
    table.string('answer_four')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_quizzes')
};
