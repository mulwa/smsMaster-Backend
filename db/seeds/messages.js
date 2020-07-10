
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 1, user_id:'2',phone_number:"0707200314", message:"this is a dummy message"},
        {id: 2, user_id:'4',phone_number:"0707200314", message:"this is a dummy message for user 4"},
        {id: 3, user_id:'3',phone_number:"0707200314", message:"this is a dummy message for user 3"},
      ]);
    });
};
