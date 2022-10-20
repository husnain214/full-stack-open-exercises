import { useState } from 'react'
import Notification from './Notification'
import Input from "./Input"
import PhoneService from '../services/PhoneService'

const PersonForm = ({persons, setPersons, setNotification}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameInput = event => setNewName(event.target.value)
    const handleNumberInput = event => setNewNumber(event.target.value)

    const handleSubmit = event => {
        event.preventDefault()

        const existingEntry = persons.filter(person => person.name === newName)

        if (!existingEntry.length) {
            PhoneService.create({name: newName, number: newNumber})

            setNotification(
                <Notification 
                    message = {`Added ${newName}`}
                    status = {true}
                />
            )

            setTimeout(() => setNotification(''), 5000)

            setPersons(persons.concat({name: newName, number: newNumber}))
        }            
        else {
            if(!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return

            PhoneService
            .update(existingEntry[0].id, {...existingEntry[0], number: newNumber})
            .then(response => PhoneService.getAll()
            .then(persons => setPersons(persons)
            .catch(error => {
                setNotification(
                    <Notification 
                        message = {`Information of ${newName} has already been removed from the phonebook`}
                        status = {false}
                    />
                )
    
                setTimeout(() => setNotification(''), 5000)

                console.log(`Error: ${error}`)
            })
            ))
        }
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