require('dotenv').config();

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
})

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
