const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack_user:${password}@fullstackopen2021-part3.r1oll.mongodb.net/phonebook-app?retryWrites=true&w=majority`
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  console.log("Phonebook:")

  Person.find({}).then(results => {
    results.forEach(result => {
      console.log(`${result.name} ${result.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}