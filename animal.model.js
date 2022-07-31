const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const AnimalEsquema = new Schema({
	name: { type: String, required: true, minLength: 3 },
	type: { type: String, required: true, minLength: 3 },
})

const Animals = mongoose.model('Animal', AnimalEsquema )

module.exports = Animals
