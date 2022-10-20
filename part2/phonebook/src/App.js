import { useState, useEffect } from 'react'
import './index.css'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PhoneService from './services/PhoneService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    console.log('effect')
    PhoneService.getAll().then(persons => setPersons(persons))
  }, [])

  console.log('render', persons.length, 'persons')

  const handleSearchInput = event => setSearchName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      {notification}

      <Filter 
        onChange = {handleSearchInput} 
        searchName = {searchName} 
      />

      <h3>add new</h3>

      <PersonForm 
        persons = {persons}
        setPersons = {setPersons}
        setNotification = {setNotification}
      />

      <h3>Numbers</h3>

      <Persons 
        persons = {persons} 
        searchName = {searchName}  
        setPersons = {setPersons}
        setNotification = {setNotification}
      />
    </div>
  )
}

export default App