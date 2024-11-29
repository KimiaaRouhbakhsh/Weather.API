const apiKey = '3b78f4ab4114a31d360a6247114b814a'; 

function getWeatherForecast() {
    const city = document.getElementById('city').value; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fa&cnt=5&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                alert('Error' + city);
                return;
            }

            const forecast = data.list;  
            const forecastDetails = forecast.map(day => {
                const condition = day.weather[0].description;  
                const temp = day.main.temp;  
                const humidity = day.main.humidity;  
                const windSpeed = day.wind.speed;  
                let iconFile = '';  

               
                switch (condition) {
                    case 'آسمان صاف':  
                        iconFile = 'sunny.png';
                        break;
                    case 'ابرهای پارچه پارچه شده':  
                        iconFile = 'p.png';
                        break;
                    case 'بارش خفیف باران': 
                        iconFile = 'heavyrain.png';
                        break;
                    case 'پوشیده از ابر': 
                        iconFile = 'cloud.png';
                        break;
                    case 'ابرهای پراکنده':  
                        iconFile = 'partlycloudy.png';
                        break;
                    default:
                        iconFile = 'def.png';
                }


                const iconUrl = `images/weather-icons/${iconFile}`;
                return `
                    <div class="forecast-item">
                        <img src="${iconUrl}" alt="${condition}" class="weather-icon">
                        <p class="large-temp">${temp} °C </p>
                        <p>${humidity}%  :رطوبت</p>
                        <p>${windSpeed} m/s :باد</p>
                    </div>
                `;
            }).join('');

            document.getElementById('forecast-details').innerHTML = forecastDetails;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error ');
        });
}
