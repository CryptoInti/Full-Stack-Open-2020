import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from  './services/persons'
/* the services/persons file contain the next code*/
// import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'

// const getAll = () => {
//     return axios.get(baseUrl)
// }

// const create = newObject => {
//     return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

// export default { getAll, create, update }


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

  useEffect(() => {
    personService
      .getAll()
      .then(r => {
        setPersons(r.data)
      })
  }, [])

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
        personService
          .create(personObject)
          .then(r => {
            console.log('rPost', JSON.stringify(r, null, 4))
            setPersons(persons.concat(r.data))
          })
      // setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
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
        pTS={personsToShow} />

    </div>
  )
}

export default App