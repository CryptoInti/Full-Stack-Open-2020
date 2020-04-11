import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from  './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  // const hook = () => {
  //   console.log('effect start')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(r => {
  //       console.log('promise fulfilled or resolved')
  //       setPersons(r.data)
  //     })
  // }
  // useEffect(hook , [])
  
  const hook = () => {
  //useEffect(() => {
    personService
      .getAll()
      .then(r => {
        setPersons(r.data)
      })
  }
  useEffect(hook , [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    }

    const found = persons.find(person => person.name === newName)
    console.log('found',found)
    if(found) {
      if(window.confirm(`${found.name} is already added to phonebook, remplace the old number ${found.number} with the new one ${personObject.number}?`))
      personService
        .update(found.id, personObject)
        .then(r => {
          console.log('r',r.data)
          const listPersons = persons.map(p => p.id === found.id ? {...p, number:r.data.number} : p)
          console.log('listPersons', listPersons)
          setPersons(listPersons)
        })
    }else{
        personService
          .create(personObject)
          .then(r => {
            console.log('rPost', JSON.stringify(r, null, 4))
            setPersons(persons.concat(r.data))
          })
      setNewName('')
      setNewNumber('')
    }
    
  }

  const delPerson = (event) => {
    console.log('delPerson', event.target.value)
    const personId = event.target.value
    const found = persons.find(p => p.id == personId)
    console.log('found in', JSON.stringify(found, null, 4))

    if(window.confirm(`Detele ${found.name}`) )
    personService
    .deletePerson(personId)
    .then(r => {
      console.log('delPerson result then', JSON.stringify(r, null, 4))
      const listPersons = persons.filter(i => i.id != personId)
      setPersons(listPersons)
    })
  }

  const handleNameChange = (event) => {
    console.log('name', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('filter', event.target.value)
    setNewFilter(event.target.value)
    if(event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false);
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handle={handleFilterChange} />
      
      <h2>Add a new Person</h2>
      <PersonForm 
        submit={addPerson} 
        name={newName} 
        hNaC={handleNameChange}
        number={newNumber}
        hNuC={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons
        pTS={personsToShow} delPerson={delPerson} />

    </div>
  )
}

export default App