
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact').insert([
        {id: 1, name: 'Mulwa christopher',phone_number:'0707200314'},
        {id: 2, name: 'Jane Muoki',phone_number:'0707200315'},
        {id: 9, name: 'Eric Maina',phone_number:'0707200319'},
        
      ]);
    });
};
