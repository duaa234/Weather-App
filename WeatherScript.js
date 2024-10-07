var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 20,
    slidesPerGroup: 6,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

const time = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

        const dynamicCards = document.getElementById("weatherCards");


        function loadDefaultCards() {
            // Default city
            const defaultCity = "srinagar";
            const key = "e96c617b9ae7473c8d6103218240510";

            // Fetch data for the default city
            let defaultCityFetch = fetch('http://api.weatherapi.com/v1/forecast.json?key=' + key + '&q=' + defaultCity + "&days=1&aqi=no&alerts=no");

            defaultCityFetch
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    test(data);
                    weatherDetails(data);
                })

        }

        window.onload = loadDefaultCards;


        function getWeather() {
            while (dynamicCards.firstChild) {
                dynamicCards.removeChild(dynamicCards.firstChild);
            }
            city = document.getElementById("city").value;
            key = "e96c617b9ae7473c8d6103218240510";
            console.log(city);

            let p = fetch('http://api.weatherapi.com/v1/forecast.json?key=' + key + '&q=' + city + "&days=1&aqi=no&alerts=no");
            p.then((value1) => {
                return value1.json()
            }).then((data) => {
                console.log(data);
                test(data)
                weatherDetails(data);
            });

            swiper.update();

        }



        function test(data) {
            let creatingCards = '';
            console.log(data.forecast.forecastday[0].hour, "hour")
            data.forecast.forecastday[0].hour.forEach((day, i) => {
                creatingCards += `
                
                <div class="swiper-slide">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title" id="date">${time[i]}</p>
                            <p class="card-text icon" id="icon"> <img src=https:${day.condition.icon}></p>
                            <p class="card-text" id="temp">${day.temp_c}&#176C</p>
                        </div>
                    </div>
                </div>
                `
            });

            dynamicCards.innerHTML = creatingCards;
        }

        
        function weatherDetails(data) {
            document.getElementById("name").innerHTML = data.location.name;
            document.getElementById("CurrentTemperature").innerHTML = data.current.temp_c + " &#176C";
            let details = data.forecast.forecastday[0];
            document.getElementById("sunrise").innerHTML = details.astro.sunrise;
            document.getElementById("sunset").innerHTML = details.astro.sunset;
            document.getElementById("rain").innerHTML = details.day.daily_chance_of_rain + "%";
            document.getElementById("Humidity").innerHTML = details.day.avghumidity + "mb";
            document.getElementById("wind").innerHTML = details.day.maxwind_kph + "km/h";
            document.getElementById("UVindex").innerHTML = details.day.uv + "of 10";
            document.getElementById("maxtemp").innerHTML = details.day.maxtemp_c + "°C";
            document.getElementById("mintemp").innerHTML = details.day.mintemp_c + "°C";
        }
