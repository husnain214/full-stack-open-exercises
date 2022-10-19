import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PhoneService from './services/PhoneService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    PhoneService.getAll().then(persons => setPersons(persons))
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
        setPersons = {setPersons}
      />
    </div>
  )
}

export default App