// Import database
const knex = require('./../db')

// Retrieve all employees
exports.getDesks = async (req, res) => {
  // Get all employees from database
  knex
    .select('*')
    .from('desks')
    .then(data => {
      // Send employees extracted from database in response
      return res.json(data)
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ success: false, message: `There was an error retrieving desks: ${err}` })
    })
}

// Create new Employee
exports.createDesk = async (req, res) => {
  // Add new Employee to database
  knex('desks')
    .insert({ // insert new record, a Employee
      'floor': req.body.floor,
      'position': req.body.position,
      'booked_by': req.body.booked_by,
      'from': req.body.from,
      'to': req.body.to
    })
    .then(() => {
      return res.json({ success: true, message: `Desk in \'${req.body.floor}\' position ${req.body.position} created.` })
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ success: false, message: `There was an error creating desk in \'${req.body.floor}\' position ${req.body.position} Desk: ${err}` })
    })
}

exports.updateDesk= async (req, res) => {
    knex('desks')
    .where('id', req.params.id)
    .update({ 
        'floor': req.body.floor,
        'position': req.body.position,
        'booked_by': req.body.booked_by,
        'from': req.body.from,
        'to': req.body.to
      })
      .then(() => {
        // Send a success message in response
        return res.json({ success: true, message: `Desk in floor \'${req.body.floor}\' number ${req.body.position} updated.` })
      })
      .catch(err => {
        // Send a error message in response
        return res.json({ success: false, message: `There was an error updating ${req.body.firstname} Desk: ${err}` })
      })
  }


exports.deleteDesk = async (req, res) => {
  knex('desks')
    .where('id', req.params.id) 
    .del() 
    .then(() => {
      return res.json({ success: true, message: `Desk ${req.params.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      return res.json({ success: false, message: `There was an error deleting ${req.params.id} Desk: ${err}` })
    })
}