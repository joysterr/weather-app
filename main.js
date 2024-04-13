async function getWeatherData(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Error! Status:  ${res.status}`)
        }
        const data = await res.json()
        renderWeatherData(data)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}

function renderWeatherData(data) {
    const location = document.querySelector('#location')
    const temp = document.querySelector('#temp')
    const weather = document.querySelector('#weather')

    location.innerHTML = data.name
    temp.innerHTML = Math.round(data.main.temp - 273.15) // convert Kelvin to Celsius and round up/down
    weather.innerHTML = data.weather[0].main

}

function updateWeather(url) {
    setInterval(() => {
        getWeatherData(url)
    }, 1000 * 60 * 60)
}

// init
function init() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = [position.coords.latitude, position.coords.longitude]
            const customURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=${import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY}`
            
            getWeatherData(customURL)
            updateWeather(customURL)
        })
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY}`
        getWeatherData(url)
        updateWeather(url)
    }
}

init()