const url = import.meta.env.VITE_API

function getWeatherData() {
    fetch(url)
        .then(res => res.json())
        .then(data => renderWeatherData(data))
        .catch(err => console.error(err))
}

function renderWeatherData(data) {
    console.log(data)
    let weather = document.querySelector('#weather')
    weather.innerHTML = data.main.temp
}

// getWeatherData()