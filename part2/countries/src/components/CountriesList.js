import CountryDetails from "./CountryDetails"

const CountriesList = ({results, countries ,setCountryInfo}) => results.map(result => {
    const showCountry = event => {
        const selectedCountry = countries.filter(country => country.name.common === event.target.value)[0]
        setCountryInfo(<CountryDetails country = {selectedCountry} />)  
    }

    return (
        <div key = {result.name.common}>
            {result.name.common} 
            <button 
                value = {result.name.common}
                onClick = {showCountry}
            >show</button>
        </div>
    )
})

export default CountriesList