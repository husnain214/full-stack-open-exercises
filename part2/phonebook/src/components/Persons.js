import PhoneService from "../services/PhoneService"

const Persons = ({persons, searchName, setPersons}) => {
    const handleDeleteBtn = event => {
        if(!window.confirm(`Delete ${event.target.dataset.name}?`)) return

        PhoneService.remove(Number(event.target.dataset.id))
        .then(response => PhoneService.getAll().then(persons => setPersons(persons)))
        .catch(error => console.error(`Error: ${error.message}`))
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
        else 
            phonebookList = persons.filter(person => person.name === searchName)
                                    .map(person => <p key = {person.name}>{person.name} {person.number}</p>)

        return phonebookList
    }

    return <div>{printPersonsList()}</div>
}

export default Persons