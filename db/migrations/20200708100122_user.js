
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users',function(table){
        table.increments(),
        table.string('name').notNullable(),
        table.string('email').notNullable(),
        table.string('password'),
        table.timestamp('created_at').defaultTo(knex.fn.now())

    }).then(()=>{
        console.log('table created successfully');
    },error => {
        console.log(`An error has Ocured ${error}`);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
  
};
