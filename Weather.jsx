import React, { useEffect, useState } from 'react'
import Search from './Search'

function Weather() {

  const[search, setSearch] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const[loading, setLoading] = useState(false);
  const[errorMessage, setErrorMessage] = useState("");

  async function fetchWeatherData(params) {
    setLoading(true)
    try {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=5516ac8833af108b2ee9ad5e94b86c6e`);
     const data = await response.json();

     if(data){
      setWeatherData(data);
      setLoading(false)
     }

     console.log(data)
    } catch (error) {
      setErrorMessage(error.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData('Melbourne')
  }, [])

  function handleSearch(){
    fetchWeatherData(search)
    setSearch("")
  }

  function getCurrentDate(){
    const date = new Date().toLocaleDateString('en-us', {
     weekday: 'long',
     month: 'long',
     day: 'numeric',
     year: "numeric"
    })
    return date
  }

  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch}/>
      <h2>{weatherData?.name} <span>{weatherData?.sys?.country}</span></h2>
      <p>{getCurrentDate()}</p>
      <h1>{weatherData?.main?.temp}</h1>
      <p>{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}</p>
      <div className='weather'>
        <div>
          <p>{weatherData?.wind?.speed}</p>
          <p>Wind Speed</p>
        </div>
        <div>
          <p>{weatherData?.main?.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
    </div>
  )
}

export default Weather