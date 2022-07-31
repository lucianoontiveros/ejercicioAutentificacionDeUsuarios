const express = require('express')
const mongoose = require('mongoose')
const Animal = require('./animal.controller')
const { Auth, autentificacion } = require('./auth.controller')
const app = express()
const port = 4000

require('dotenv').config()
mongoose.connect(process.env.BASEDEDATOS)

app.use(express.json())

app.get('/animals', autentificacion, Animal.list)
app.post('/animals', autentificacion, Animal.create)
app.put('/animals/:id', autentificacion, Animal.update)
app.patch('/animals/:id', autentificacion, Animal.update)
app.delete('/animals/:id', autentificacion, Animal.destroy)
 
app.post('/register', Auth.register)
app.post('/login', Auth.login)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
