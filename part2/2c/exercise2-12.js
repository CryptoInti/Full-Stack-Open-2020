import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesToShow = ({countries, newFilter}) => {
  console.log('in', newFilter)
  const filter = countries.filter(country => country.name.toLowerCase().indexOf(newFilter) !== -1)
  console.log('filter', filter)

  const sum = filter.length
  console.log('Sum', sum)
  if ( sum === 0 ) {
    return (
      <div>
        Can't find any country with '{newFilter}' try other
      </div>
    )
  }
  if(sum == 1 ) {
    return (
      <div>
        <h1>{filter[0].name}</h1>
        <p>Capital {filter[0].capital}</p>
        <p>Population {filter[0].population}</p>
        <h2>Languages</h2>
        {filter[0].languages.map((lang, i) => 
          <li key={i}>{lang.name}</li>
        )}
        <br></br>
        <img width='200px' src={filter[0].flag} alt={filter[0].name}></img>
      </div>
    )
  }
  if(sum <= 4 && sum != 1) { 
    return (
      <div>
        {filter.map((country, i) =>
          <p key={i}>{country.name}</p>
        )}
      </div>
    )}
  if(sum > 4) { return (<div><p>To many countries to show</p></div>)}
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState([])

  const hook_countries = () => {
    console.log('effect get countries start')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(r => {
        console.log('promise of countries get fulfilled or resolved')
        setCountries(r.data)
        console.log('countries', JSON.stringify(countries, null, 4))
      })
  }
  useEffect(hook_countries , [] )

  const handlerFindChange = (event) => {
    console.log('find', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <div>
        Find Countries <input value={newFilter} onChange={handlerFindChange} />
      </div>
      <CountriesToShow countries={countries} newFilter={newFilter} />
    </div>
  )

}

export default App