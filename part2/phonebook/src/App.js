import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const handleSearchInput = event => setSearchName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        onChange = {handleSearchInput} 
        searchName = {searchName} 
      />

      <h3>add new</h3>

      <PersonForm 
        persons = {persons}
        setPersons = {setPersons}
      />

      <h3>Numbers</h3>

      <Persons 
        persons = {persons} 
        searchName = {searchName}  
      />
    </div>
  )
}

export default App