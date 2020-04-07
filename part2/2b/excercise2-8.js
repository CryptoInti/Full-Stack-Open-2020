import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-345-678', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const found = persons.find(person => person.name === newName)
    console.log('found',found)
    if(found) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const Person = ({person}) => {
    return (
      <li key={person.id}>{person.name} / {person.number}</li>
    )
  }

  const handleNameChange = (event) => {
    console.log('name', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        {/* <div>name: <input value={newName} onChange={handlePersonChange}/></div> */}

        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => 
          <p key={i}>{person.name} / {person.number}</p>
        )}
      </div>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App