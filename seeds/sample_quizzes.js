
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_quizzes').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_quizzes').insert([
        {
         question: 'Which Pokemon are you?',
         answer_one: 'Pikachu',
         answer_two: 'Squirtle',
         answer_three: 'Charmander',
         answer_four: 'Mewtwo',
         correct_answer: 3
        },
        {
         question: 'Pick your super power?',
         answer_one: 'Flying',
         answer_two: 'Invisibility',
         answer_three: 'Super Strength',
         answer_four: 'Breathe Fire',
         correct_answer: 2
        },
        {
         question: 'How many times/day do you take selfies?',
         answer_one: 'Zero',
         answer_two: 'Two',
         answer_three: 'Ten',
         answer_four: 'Thirty',
         correct_answer: 4
        },
      ]);
    });
};
