// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})


knex.schema
  .hasTable('employees')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('employees', (table)  => {
          table.increments('id').primary()
          table.string('firstname')
          table.string('surname')
          table.string('key')
        })
        .then(() => {
          // Log success message
          console.log('Table \'employees\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
knex.select('*').from('employees')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

  knex.schema
  .hasTable('desks')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('desks', (table)  => {
          table.increments('id').primary()
          table.integer('floor')
          table.integer('position')
          table.integer('booked_by')
          table.date('from')
          table.date('to')
        })
        .then(() => {
          // Log success message
          console.log('Table \'desks\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
knex.select('*').from('desks')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex