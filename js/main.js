const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=cc03fe12c1d6dc36155e562f488b274e'
const form = document.querySelector('form')
const output = document.querySelector('.output')
const input = document.querySelector('#inp')

const getWeather = async () => {
    const url = API + input.value + key
    const req = await fetch(url)
    const res = await req.json()
    renderWeather(res);
    getMap(res.coord)
    input.value = ''
}

const renderWeather = (data) => {
    output.innerHTML = ''
    console.log(data);
    const title = document.createElement('h1')
    title.textContent = data.name

    const tempC = document.createElement('h4')
    tempC.textContent = `C:${Math.floor(data.main.temp - 273.15)}`
    const tempF = document.createElement('h4')
    tempF.textContent = `F:${Math.floor((data.main.temp - 273.15) * 1.8) + 32}`



    const weatherM = document.createElement('h3')
    weatherM.textContent = data.weather[0].main


    const windD = document.createElement('h3')
    windD.textContent = data.wind.deg
    const windG = document.createElement('h3')
    windG.textContent = data.wind.gust
    const windS = document.createElement('h3')
    windS.textContent = data.wind.speed

    const contryCode = document.createElement('h2')
    contryCode.textContent = data.sys.country


    output.append(title, tempC, tempF, weatherM, windD, windG, windS, contryCode)
}

const getMap = ({ lat, lon }) => {
    let map = document.createElement('div');
    map.id = map


    DG.then(() => {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    output.append(map)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})
