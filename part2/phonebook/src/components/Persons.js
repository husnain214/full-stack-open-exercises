import PhoneService from "../services/PhoneService"
import Notification from "./Notification"

const Persons = ({persons, searchName, setPersons, setNotification}) => {
    const handleDeleteBtn = event => {
        if(!window.confirm(`Delete ${event.target.dataset.name}?`)) return

        PhoneService.remove(event.target.dataset.id)
        .then(response => PhoneService.getAll().then(persons => setPersons(persons)))
        .catch(error => {
            console.error(`Error: ${error.message}`)

            setNotification(
                <Notification 
                    message = {`Could not remove ${event.target.dataset.name} from the phonebook`}
                    status = {false}
                />
            )

            setTimeout(() => setNotification(''), 5000)
        })
    }

    const printPersonsList = () => {
        let phonebookList = ""
        
        if (!searchName) 
            phonebookList = 
            (persons.length) ? persons.map(
                person => <div key = {person.name}>
                            {person.name} {person.number}
                            <button 
                                onClick = {handleDeleteBtn} 
                                data-id = {person.id} 
                                data-name = {person.name}
                            >Delete</button>
                          </div>
            ) : "..."
        else phonebookList = persons
                            .filter(person => person.name === searchName)
                            .map(person => <p key = {person.name}>{person.name} {person.number}</p>)

        return phonebookList
    }

    return <div>{printPersonsList()}</div>
}

export default Persons