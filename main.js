const url = import.meta.env.VITE_API

function getWeatherData() {
    fetch(url)
        .then(res => res.json())
        .then(data => renderWeatherData(data))
        .catch(err => console.error(err))
}

function renderWeatherData(data) {
    console.log(data)
    let location = document.querySelector('#location')
    let temp = document.querySelector('#temp')
    let weather = document.querySelector('#weather')

    location.innerHTML = data.name
    temp.innerHTML = Math.round(data.main.temp)
    weather.innerHTML = data.weather[0].main

}

getWeatherData()

setInterval(() => {
    getWeatherData()
}, 1000 * 60 * 60)