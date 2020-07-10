
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact-group').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact-group').insert([
        {id: 1, user_id: 1,group_id:3},
        {id: 2, user_id: 2,group_id:2},
        {id: 4, user_id: 2,group_id:3},
        {id: 3, user_id: 9,group_id:1}
      ]);
    });
};
