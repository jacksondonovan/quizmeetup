
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_data',function(table){
    table.increments()
    table.string('username').notNullable();
    table.string('password')
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('question')
    table.string('answer_one')
    table.string('answer_two')
    table.string('answer_three')
    table.string('answer_four')
    table.integer('correct_answer')
    table.string('restaurants_nearby')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_data')
};
