const express = require('express')
const routes = express.Router()
const ControllerUser = require('../controllers/user')
const ControllerWorker = require('../controllers/worker')
const ControllerContent = require('../controllers/content')

routes.post('/owner/register', ControllerUser.register)
routes.post('/owner/login', ControllerUser.login)
routes.post('/owner/logout', ControllerUser.logout)

routes.post('/worker/register', ControllerWorker.register)
routes.post('/worker/login', ControllerWorker.login)
routes.post('/worker/logout', ControllerWorker.logout)

routes.post('/content/create', ControllerContent.createContent)
routes.put('/content/update', ControllerContent.updateContent)
routes.delete('/content/delete', ControllerContent.deleteContent)

module.exports = routes