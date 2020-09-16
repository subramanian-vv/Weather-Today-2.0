const api = {
    key: '0844cbef29cfa15d54ff3f5052241c3b',
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?'
}

const input = document.getElementById('city');

//Function to fetch data from API
function fetchData(city) {
    fetch(`${api.baseURL}q=${city}&APPID=${api.key}&units=metric`)
        .then(function(weather) {
            return weather.json();
        }).then(displayWeather);
}

//Function to display data fetched from API
function displayWeather(weather) {
    let cityName = document.getElementById('city-name');
    let cityWeather = document.getElementById('city-weather');
    let cityTemp = document.getElementById('city-temp');
    let background = document.getElementById('bgimg');
    let weatherIcon = document.getElementById('weather-icon');
    let tempIcon = document.getElementById('temp-icon');

    document.getElementById('info').classList.remove('hide');
    cityName.innerText = weather.name + ', ' + weather.sys.country;
    cityWeather.innerText = weather.weather[0].main;
    cityTemp.innerText = Math.ceil(weather.main.temp) + ' °C';
    tempIcon.classList.add('fa-temperature-low');

    if(weather.weather[0].main == 'Clouds') {

        background.style.backgroundImage = `url(${cloudDataURL})`;
        weatherIcon.classList.add('fa-cloud-sun');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Clear') {

        background.style.backgroundImage = `url(${sunDataURL})`;
        weatherIcon.classList.add('fa-sun');
        weatherIcon.classList.remove('fa-cloud-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Drizzle') {

        background.style.backgroundImage = `url(${rainDataURL})`;
        weatherIcon.classList.add('fa-cloud-rain');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-sun');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Haze' || weather.weather[0].main == 'Mist') {

        background.style.backgroundImage = `url(${hazeDataURL})`;
        weatherIcon.classList.add('fa-smog');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-cloud-sun');

    }
}

//Listening on pressing ENTER key
input.addEventListener('keyup', function(event) {
    
    if(event.keyCode == 13) {
        fetchData(input.value);
    }

});

//Cloud canvas
var canvasCloud = document.getElementById('canvas-cloud');
canvasCloud.width = window.innerWidth;
canvasCloud.height = window.innerHeight;
var ctxCloud = canvasCloud.getContext('2d');

//Rain canvas
var canvasRain = document.getElementById('canvas-rain');
canvasRain.width = window.innerWidth;
canvasRain.height = window.innerHeight;
var ctxRain = canvasRain.getContext('2d');

//Sun canvas
var canvasSun = document.getElementById('canvas-sun');
canvasSun.width = window.innerWidth;
canvasSun.height = window.innerHeight;
var ctxSun = canvasSun.getContext('2d');

//Haze canvas
var canvasHaze = document.getElementById('canvas-haze');
canvasHaze.width = window.innerWidth;
canvasHaze.height = window.innerHeight;
var ctxHaze = canvasHaze.getContext('2d');

function drawCloud(x, y) {
    ctxCloud.fillStyle = 'black';
    ctxCloud.fillRect(0,0,canvasCloud.width,canvasCloud.height);
    ctxCloud.moveTo(x, y);
    ctxCloud.bezierCurveTo(x - 40, y + 10, x - 20, y + 180, x + 60, y + 70);
    ctxCloud.bezierCurveTo(x + 100, y + 100, x + 150, y + 100, x + 150, y + 70);
    ctxCloud.bezierCurveTo(x + 280, y + 70, x + 230, y + 40, x + 210, y + 20);
    ctxCloud.bezierCurveTo(x + 360, y - 40, x + 210, y - 50, x + 160, y - 30);
    ctxCloud.bezierCurveTo(x + 150, y - 75, x + 80, y - 60, x + 70, y - 30);
    ctxCloud.bezierCurveTo(x + 30, y - 75, x - 10, y - 60, x, y);
    ctxCloud.closePath();
    ctxCloud.lineWidth = 5;
    ctxCloud.fillStyle = 'gray';
    ctxCloud.fill();
    ctxCloud.strokeStyle = 'darkgray';
    ctxCloud.stroke();    
}

function drawDrop(x, y, xr, yr) {
    ctxRain.beginPath();
    ctxRain.moveTo(x, y);
    ctxRain.bezierCurveTo(x - 40, y + 10, x - 20, y + 180, x + 60, y + 70);
    ctxRain.bezierCurveTo(x + 100, y + 100, x + 150, y + 100, x + 150, y + 70);
    ctxRain.bezierCurveTo(x + 280, y + 70, x + 230, y + 40, x + 210, y + 20);
    ctxRain.bezierCurveTo(x + 360, y - 40, x + 210, y - 50, x + 160, y - 30);
    ctxRain.bezierCurveTo(x + 150, y - 75, x + 80, y - 60, x + 70, y - 30);
    ctxRain.bezierCurveTo(x + 30, y - 75, x - 10, y - 60, x, y);
    ctxRain.lineWidth = 5;
    ctxRain.fillStyle = 'gray';
    ctxRain.fill();
    ctxRain.strokeStyle = 'darkgray';
    ctxRain.stroke();
    ctxRain.closePath();

    for(let i = 0; i < 3; i++) {
        tempx = xr;
        tempy = yr;
        for(let j = 0; j < 4; j++) {
            ctxRain.beginPath();
            ctxRain.arc(tempx, tempy, 10, 0, 2 * Math.PI);
            ctxRain.fill();
            ctxRain.strokeStyle = 'gray';
            ctxRain.stroke();
            tempx-=20;
            tempy+=20;
        }
        xr+=100;
    }
}

function drawSun(x, y) {
    ctxSun.beginPath();
    ctxSun.arc(x, y, 100, 0, 2 * Math.PI);
    ctxSun.lineWidth = 5;
    ctxSun.fillStyle = 'gold';
    ctxSun.fill();
    ctxSun.strokeStyle = 'orange';
    ctxSun.stroke();
}

function drawHaze(x, y) {
    ctxHaze.fillStyle = 'antiquewhite';
    ctxHaze.fillRect(0,0,canvasHaze.width,canvasHaze.height);
    ctxHaze.moveTo(x, y);
    ctxHaze.bezierCurveTo(x - 40, y + 10, x - 20, y + 180, x + 60, y + 70);
    ctxHaze.bezierCurveTo(x + 100, y + 100, x + 150, y + 100, x + 150, y + 70);
    ctxHaze.bezierCurveTo(x + 280, y + 70, x + 230, y + 40, x + 210, y + 20);
    ctxHaze.bezierCurveTo(x + 360, y - 40, x + 210, y - 50, x + 160, y - 30);
    ctxHaze.bezierCurveTo(x + 150, y - 75, x + 80, y - 60, x + 70, y - 30);
    ctxHaze.bezierCurveTo(x + 30, y - 75, x - 10, y - 60, x, y);
    ctxHaze.closePath();
    ctxHaze.lineWidth = 1;
    ctxHaze.fillStyle = 'beige';
    ctxHaze.fill();
    ctxHaze.strokeStyle = 'brown';
    ctxHaze.stroke(); 
}

drawHaze(2*window.innerWidth/5,window.innerHeight/3);
drawSun(window.innerWidth/2,2*window.innerHeight/5);
drawDrop(window.innerWidth/4,window.innerHeight/3,window.innerWidth/4,window.innerHeight/2);
drawDrop(window.innerWidth/2,window.innerHeight/3,window.innerWidth/2,window.innerHeight/2);
drawCloud(window.innerWidth/4,window.innerHeight/3);
drawCloud(window.innerWidth/2,window.innerHeight/3);

//Gets the canvas as an image
const cloudDataURL = canvasCloud.toDataURL();
const rainDataURL = canvasRain.toDataURL();
const sunDataURL = canvasSun.toDataURL();
const hazeDataURL = canvasHaze.toDataURL();