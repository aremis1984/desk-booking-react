const express = require('express')

const EmployeesCtrl = require('../controllers/employees-controller')

const router = express.Router()

router.post('/employee', EmployeesCtrl.createEmployee)
router.put('/employee/:id', EmployeesCtrl.updateEmployee)
router.delete('/employee/:id', EmployeesCtrl.deleteEmployee)
router.get('/employee/:id', EmployeesCtrl.getEmployeeById)
router.get('/employees', EmployeesCtrl.getEmployees)

module.exports = router
