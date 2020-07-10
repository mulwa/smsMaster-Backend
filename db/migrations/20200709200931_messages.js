
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('messages',function(table){
        table.increments(),
        table.string('user_id').notNullable(),
        table.string('phone_number').notNullable(),
        table.string('message').notNullable(),
        table.timestamp('created_at').defaultTo(knex.fn.now())

    }).then(()=>{
        console.log('table created successfully');
    },error => {
        console.log(`An error has Ocured ${error}`);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');  
};
