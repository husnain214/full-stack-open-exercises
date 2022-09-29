import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const handleInput = event => setNewName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    setPersons(persons.concat({name: newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange = {handleInput} value = {newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {
          persons.map(person => <p key = {persons.name}>{person.name}</p>) ?? "..."
        }
      </div>
    </div>
  )
}

export default App