import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_weather_key = process.env.REACT_APP_API_WEATHER_KEY
console.log('api_weather_key', api_weather_key)
// api key 3c5cbea525a02f79dc82a53e7ec4d746

const ShowWeather = ({weather}) => {
  console.log('weather', JSON.stringify(weather, null, 4))

  if (weather.length == 0) {
    return(<div></div>)
  }else{
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>Temperature {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}></img>
        <p>Wind {weather.current.wind_speed} mps, direction {weather.current.wind_dir}</p>
      </div>
    )
  }
} 

const ShowCountry = ({country}) => {
  const [ show, toggleShow ] = useState(false);
  return (
    <div>
      <button
        onClick={() => toggleShow(!show)}
      >
       { show ? 'hide' : 'show' } 
      </button>
      { show && <DetailCountry country={country} /> }
    </div>
  )
}

const DetailCountry = ({country}) => {
  console.log('detail', country.name)
  const [ weather, setWeather ] = useState([])

  const hook_weather = () => {
    console.log('effect get weather start')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_weather_key}&query=${country.capital}`)
      .then( r => {
        console.log('promise of weather get fulfilled or resolved')
        setWeather(r.data)
        console.log('weather', JSON.stringify(weather, null, 4))
      })
    }
  useEffect(hook_weather , [] )

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      {country.languages.map((lang, i) => 
        <li key={i}>{lang.name}</li>
      )}
      <br></br>
      <img width='200px' src={country.flag} alt={country.name}></img>
      <br></br>
      { country.capital != '' && <ShowWeather weather={weather}/> }
  </div>
  )
}
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
        <DetailCountry country={filter[0]} />
      </div>
    )
  }
  if(sum <= 4 && sum != 1) { 
    return (
      <div>
        <table>
          <tbody>
        {filter.map((country, i) => {
          return (
              <tr key={i}>
              <td><p>{country.name}</p></td>
              <td><ShowCountry country={country} /></td>
              </tr>
          )
        }
        )}
        </tbody>
        </table>
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