import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'persons')

  const handleSearchInput = event => setSearchCountry(event.target.value)

  const findSearchedCountries = () => {
    let searchResults = countries
                          .filter(country => country.name.common.includes(searchCountry))
                          .map(country => <p key = {country.name.common}>{country.name.common}</p>)

    if (searchResults.length > 10) return "Too many matches, specify another filter"

    if (searchResults.length === 1) console.log (searchResults[0])
  } 

  return (
    <div>
      <label>find countries</label>
      <input type = "text" onChange = {handleSearchInput}></input>

      <div>
        {
          findSearchedCountries()
        }
      </div>
    </div>
  )
}

export default App