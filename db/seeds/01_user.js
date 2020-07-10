
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Christopher Mulwa',email:'mulwatech@gmail.com',password:'password'},
        {id: 2, name: 'John Mathew',email:'mathew@gmail.com',password:'password1'},
        
      ]);
    });
};
