const url = import.meta.env.VITE_API || process.env.VITE_API

async function getWeatherData() {
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
    temp.innerHTML = Math.round(data.main.temp)
    weather.innerHTML = data.weather[0].main

}

getWeatherData()

setInterval(() => {
    getWeatherData()
}, 1000 * 60 * 60)