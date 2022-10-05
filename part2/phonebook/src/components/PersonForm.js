import { useState } from 'react'

import Input from "./Input"

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameInput = event => setNewName(event.target.value)
    const handleNumberInput = event => setNewNumber(event.target.value)

    const handleSubmit = event => {
        event.preventDefault()

        if (persons.find(person => person.name === newName) === undefined) 
            setPersons(persons.concat({name: newName, number: newNumber}))
        else  
            alert(`${newName} is already in the phonebook`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                text = "name"
                onChange = {handleNameInput}
                value = {newName}
            />

            <Input 
                text = "number"
                onChange = {handleNumberInput}
                value = {newNumber}
            />

            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm