import { useState, useEffect } from "react"

import axios from "axios"

const WeatherDetails = ({country}) => {
    const [weatherStats, setWeatherStats] = useState('')

    const API_KEY = process.env.REACT_APP_API_KEY
    const LATITUDE = country.latlng[0]
    const LONGITUDE = country.latlng[1]
    const KELVIN_VALUE = 273

    const KelvintoCelsius = temperature => temperature - KELVIN_VALUE
        
    const weatherCall = async () => {
        const weatherResponse = await axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}`)
        .then(response => {
            console.log('weather promise fulfilled')

            return response.data
        }) 

        const temperature = KelvintoCelsius(weatherResponse.main.temp).toFixed(2)
        const wind = weatherResponse.wind.speed
        const iconUrl = `http://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`

        setWeatherStats(
            <>
                <p>temperature {temperature} Celsius</p>
                <img src = {iconUrl} alt = "weather icon"></img>
                <p>wind {wind} m/s</p>
            </>
        )
    }

    useEffect(() => {   weatherCall()   }, []);

    return weatherStats
}

export default WeatherDetails