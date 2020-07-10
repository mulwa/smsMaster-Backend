module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "sandamiano",
      database: "alpha",
    },
    migrations: {
        directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname +'/db/seeds'
    }
    
  },
  production: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'sandamiano',
      database : 'alpha'
    },
    migrations: {
        directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname + './db/seeds'
    }
  },
};

// var knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "127.0.0.1",
//     user: "your_database_user",
//     password: "your_database_password",
//     database: "myapp_test",
//   },
// });
