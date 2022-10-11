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

  const printCountriesList = results => results.map(result => <p key = {result.name.common}>{result.name.common}</p>)

  const printCountryDetails = country => {
    return (
      <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>

      <ul>
        {
          Object
            .values(country.languages)
            .map(language => <li key = {language}>{language}</li>)
        }
      </ul>

      <img src = {country.flags.png} />
    </div>
    )
  }

  const findSearchedCountries = () => {
    const searchResults = countries.filter(country => country.name.common.includes(searchCountry))

    if (searchResults.length > 10) return "Too many matches, specify another filter" 

    if (searchResults.length === 1) return printCountryDetails (searchResults[0])

    if (searchResults.length < 10 && searchResults.length > 1) 
      return printCountriesList (searchResults)
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