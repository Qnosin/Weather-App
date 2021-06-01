async function getLocalization() {
    try {
        await navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            getWeather(lat, lon);
        })
    } catch {
        console.log('Problem with Localization no')

    }
}

async function getWeather(lat, lon) {
    try {
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=c7a401701abef6ad02688053327a9b40&units=metric`)
            .then((msg) => msg.json())
            .then((data) => {
                getItToDom(data)
            })
    } catch {
        console.log('Problem with downloading weather data')
    }
}

getLocalization()

async function getItToDom(data) {
    console.log(data);
    //Date for now
    let date = new Date
    let fullDate = `${date.getDate()}.` + `${date.getMonth() + 1}.` + `${date.getFullYear()}`
        //main 3 days link to Dom
    let day1 = document.querySelector('.day1');
    let day2 = document.querySelector('.day2');
    let day3 = document.querySelector('.day3');
    let day4 = document.querySelector('.day4');
    let day5 = document.querySelector('.day5');
    let day6 = document.querySelector('.day6');
    let allDays = [day1, day2, day3, day4, day5, day6];
    let presentation = document.querySelector('.presentation');
    //showing info about region and capitol
    presentation.append(data.timezone)
        //append to all days image and description and information
    for (let x = 0; x <= 6; x++) {
        if ((date.getMonth() === 0 || 2 || 4 || 6 || 7 || 9 || 11) && (date.getDate() === 31)) {
            date.setDate(1);
            date.setMonth(date.getMonth())
        }
        let newPlace = document.createElement('img')
        let newDesc = document.createElement('p')
        let Temp = document.createElement('p');
        let TempMax = document.createElement('p');
        let TempMin = document.createElement('p');
        newPlace.setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[x].weather[0].icon}.png`)
        newDesc.textContent += data.daily[x].weather[0].description + ' ' + fullDate
        Temp.textContent += 'Temp: ' + Math.ceil(data.daily[x].temp.day) + '℃'
        TempMax.textContent += 'TempMax: ' + Math.floor(data.daily[x].temp.max) + '℃'
        TempMin.textContent += 'TempMin: ' + Math.floor(data.daily[x].temp.min) + '℃'
        if (x == 1) {
            fullDate = `${date.getDate() + 1}.` + `${date.getMonth() + 1}.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        } else if (x == 2) {
            fullDate = `${date.getDate() + 2}.` + `${date.getMonth() + 1}.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        } else if (x == 3) {
            fullDate = `${date.getDate() + 3}.` + `${date.getMonth() + 1 }.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        } else if (x == 4) {
            fullDate = `${date.getDate() + 4}.` + `${date.getMonth() + 1}.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        } else if (x == 5) {
            fullDate = `${date.getDate() + 5}.` + `${date.getMonth() + 1 }.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        } else if (x == 6) {
            fullDate = `${date.getDate() + 6}.` + `${date.getMonth()+ 1}.` + `${date.getFullYear()}`
            newDesc.textContent = data.daily[x].weather[0].description + ' ' + fullDate
        }
        allDays[x].append(newPlace, newDesc, Temp, TempMax, TempMin);
    }
}