const Persons = ({persons, searchName}) => {
    const printPersonsList = () => {
        let phonebookList = ""

        if (!searchName) 
            phonebookList = 
                (persons.length) ? persons.map(
                    person => <p key = {person.name}>{person.name} {person.number}</p>
                ) : "..."
        else 
            phonebookList = persons.filter(person => person.name === searchName)
                                    .map(person => <p key = {person.name}>{person.name} {person.number}</p>)

        return phonebookList
    }

    return <div>{printPersonsList()}</div>
}

export default Persons