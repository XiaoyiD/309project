/* Users model */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// We'll make this model in a different way
const TableSchema = new mongoose.Schema({
	location: String,
	floor: String,
	description:String,
	numberOfSeats:Number,
	start:Number,
	end:Number,
	subject:String,
	users:[]
});



const Table = mongoose.model('Table', TableSchema)

module.exports = { Table }