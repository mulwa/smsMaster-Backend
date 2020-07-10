
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('group').del()
    .then(function () {
      // Inserts seed entries
      return knex('group').insert([
        {id: 1, group_name: 'Officials'},
        {id: 2, group_name: 'Class 4'},
        {id: 3, group_name: 'Class 8'}
      ]);
    });
};
