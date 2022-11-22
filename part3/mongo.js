const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const phNumber = process.argv[4]

const url = `mongodb+srv://husnain214:${password}@cluster0.ezphd2n.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(result => {
    console.log('connected')

    if(process.argv.length < 4) {
      console.log('phonebook:')

      Person.find({})
        .then(persons => {
          persons.forEach(person =>
            console.log(person.name, person.number)
          )
        })
    }
    else {
      const person = new Person({ name: personName, number: phNumber })

      return person.save()
    }
  })
  .then(result => {
    if(process.argv.length < 4) return

    console.log(`added ${result.name} number ${result.number} to phonebook`)

    return mongoose.connection.close()
  })
  .catch(err => console.log(err))