import { useState, useEffect } from 'react'
import axios from 'axios'

import CountriesList from './components/CountriesList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('')
  const [countryInfo, setCountryInfo] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })   
  }, [])

  console.log('render', countries.length, 'countries')

  const handleSearchInput = event => setSearchCountry(event.target.value)

  const findSearchedCountries = () => {
    const searchResults = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry))

    if (searchResults.length > 10) 
      return "Too many matches, specify another filter" 

    if (searchResults.length === 1) 
      return <CountryDetails country = {searchResults[0]} /> 

    if (searchResults.length < 10 && searchResults.length > 1) 
      return <CountriesList 
                results = {searchResults} 
                countries = {countries} 
                setCountryInfo = {setCountryInfo} 
              />
  } 

  return (
    <div>
      <label>find countries</label>
      <input type = "text" onChange = {handleSearchInput}></input>

      <div>{findSearchedCountries()}</div>
      <div>{countryInfo}</div>
    </div>
  )
}

export default App