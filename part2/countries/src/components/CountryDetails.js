import WeatherDetails from "./WeatherDetails"

const CountryDetails = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h2>languages</h2>

            <ul>
                {
                Object.values(country.languages).map(language => <li key = {language}>{language}</li>)
                }
            </ul>

            <img src = {country.flags.png} alt = "flag" />

            <WeatherDetails country = {country} />
        </div>
    )
}

export default CountryDetails