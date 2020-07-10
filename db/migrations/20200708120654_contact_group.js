
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('contact').then((exists) => {
        console.log('does knex have contact table?', exists);
        if (!exists) {
            return knex.schema.createTable('contact', (table) => {
                table.uuid('id'),
                table.string('name').notNullable(),
                table.string('phone_number').notNullable(),
                table.timestamp('created_at').defaultTo(knex.fn.now())
            });
        }
    }).then(() => {
        return knex.schema.hasTable('group').then((exists) => {
            console.log('does knex have group table?', exists);
            if (!exists) {
                return knex.schema.createTable('group', (table) => {
                    table.uuid('id'),
                    table.string('group_name').notNullable(),
                    table.timestamp('created_at').defaultTo(knex.fn.now())
                })
            }
        });
    }).then(() => {
        return knex.schema.hasTable(`contact-group`).then((exists) => {
            console.log('does knex have contact-group table?', exists);
            if (!exists) {
                return knex.schema.createTable(`contact-group`, (table)=> {
                    table.uuid('user_id').references('id').inTable('contact').notNull();
                    table.uuid('group_id').references('id').inTable('group').notNull();
                    table.increments();  
                })
            }
        })
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('contact-group')
      .then(() => knex.schema.dropTable('contact'))
      .then(() => knex.schema.dropTable('group'));
}