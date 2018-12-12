const mongoose = require('mongoose')

// connect to our database

const mongoURI = process.env.MONGODB_URI || 'mongodb://dxy_db:Duxiaoyi0060@ds263380.mlab.com:63380/table_db'

mongoose.connect(mongoURI, { useNewUrlParser: true});

module.exports = { mongoose }
