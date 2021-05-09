// Import database
const knex = require('./../db')

// Retrieve all employees
exports.getEmployees = async (req, res) => {
  // Get all employees from database
  knex
    .select('*') // select all records
    .from('employees') // from 'employees' table
    .then(userData => {
      // Send employees extracted from database in response
      return res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ message: `There was an error retrieving employees: ${err}` })
    })
}

// Retrieve employee by id
exports.getEmployeeById = async (req, res) => {
    // Get all employees from database
    knex
      .select('*') // select all records
      .from('employees') // from 'employees' table
      .where('id', req.params.id) // find correct record based on id
      .then(userData => {
        // Send employees extracted from database in response
        return res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        return res.json({ message: `There was an error retrieving employee: ${err}` })
      })
  }

// Create new Employee
exports.createEmployee = async (req, res) => {
  // Add new Employee to database
  knex('employees')
    .insert({ // insert new record, a Employee
      'firstname': req.body.firstname,
      'surname': req.body.surname,
      'key': req.body.key
    })
    .then(() => {
      // Send a success message in response
      return res.json({ message: `Employee \'${req.body.firstname}\' by ${req.body.surname} created.` })
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ message: `There was an error creating ${req.body.firstname} Employee: ${err}` })
    })
}

// Create new Employee
exports.updateEmployee = async (req, res) => {
    // Add new Employee to database
    knex('employees')
    .where('id', req.params.id)
    .update({ // update record, a Employee
        'firstname': req.body.firstname,
        'surname': req.body.surname,
        'key': req.body.key
      })
      .then(() => {
        // Send a success message in response
        return res.json({ message: `Employee \'${req.body.firstname}\' by ${req.body.surname} updated.` })
      })
      .catch(err => {
        // Send a error message in response
        return res.json({ message: `There was an error creating ${req.body.firstname} Employee: ${err}` })
      })
  }

// Remove specific Employee
exports.deleteEmployee = async (req, res) => {
  // Find specific Employee in the database and remove it
  knex('employees')
    .where('id', req.params.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      return res.json({ message: `Employee ${req.params.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ message: `There was an error deleting ${req.params.id} Employee: ${err}` })
    })
}