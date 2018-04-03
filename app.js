// get locasion
windowFunction();
function windowFunction() {
// get geo data
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const posCooLat = position.coords.latitude;
            const posCooLon = position.coords.longitude;
            lat = Number(posCooLat.toFixed(6));
            lon = Number(posCooLon.toFixed(6));
//set up fetch api 
// url (required), options (optional)
            let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
            let fetchApi = fetch(url, {
                method: 'get'
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    return response.json();
                }
            }).then(function (json) {
// call click funtion json as pramiter
            clickFunction(json);
// import url                 
            let { urlBg } = getImgF(json);
// make page get and display data 
               let fullBody = document.getElementById('fullBody');fullBody.innerHTML = `<div id="templateBody" class="template_body"><h2>${json.name} ${json.sys.country}</h2><h3>Coord lat ${json.coord.lat} lon ${json.coord.lon}</h3><br /><h4>Wind Speeed: ${json.wind.speed}mph <br /> Pressure: ${json.main.pressure}mb<br />
                Humidity: ${json.main.humidity}%<br />
                Min Temp: ${json.main.temp_min}%<br />
                Max Temp: ${json.main.temp_max}%<br />
                </h4><br /><br /><p class="weatherClass" id="weatherArray">${json.weather[0].main.toUpperCase()} ${json.weather[0].description}<br /><img><br />Temp ${json.main.temp}%C<br />Clouds ${json.clouds.all}% Wind Speeed ${json.wind.speed}mph</p><img id="imgIcon" src="${json.weather[0].icon}">
            </div>`;
                let img = document.getElementsByTagName("img")[0];   
// Get the first <img> element in the document
                let imgIcon = document.getElementsByTagName("img")[1];   
// Get the icon <img> element in the document
                let att = document.createAttribute("src");
// Create a "src" attribute
                att.value = urlBg; 
// Set the value of the src attributes
                img.setAttributeNode(att);
                imgIcon.setAttributeNode(att);    
// throw error measage
            }).catch(function (err) {
                console.error("Somthing wrong "+err);
// end of fetch                
            });
// end of getCurrentPosition funtion             
        });
// end of getCurrentPosition if statment        
    }
    function getImgF(json) {
/* background images-- 0=Rain 1=Snow 2=Clear 3=Sun 4=Storm 5=Cloud 6=Drizzle 7=Fog */
    const backgroundImage = ["http://res.cloudinary.com/pieol2/image/upload/v1518468490/rain.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518468218/snowtree.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518468209/nature.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518468183/sunshine.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518468205/flash.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518468196/cloud.jpg","http://res.cloudinary.com/pieol2/image/upload/v1518635890/drizzle.jpg", "http://res.cloudinary.com/pieol2/image/upload/v1520194062/foggy.jpg"];
        var varHolder = 0;
        switch(json.weather[0].main){
            case 'Rain': varHolder = 0;
            break;
            case 'Snow': varHolder = 1;
            break;
            case 'Clear': varHolder = 2;
            break;
            case 'Sun': varHolder = 3;
            break;
            case 'Storm': varHolder = 4;
            break;
            case 'Clouds': varHolder = 5;
            break;
            case 'Drizzle': varHolder = 6;
            break;
            case'Fog': varHolder = 7;
        }
// get the back ground img from array at the idex from the switch using the var none block scope old school
        const urlBg = backgroundImage[varHolder];
        return { urlBg };
// end of getImgf                         
    }
// end of window funcion
}
// click function with json as paramiter
function clickFunction(json) {
// make sure dom is ready
    setTimeout(function () {
// get button by id add an event lisener         
        document.getElementById('button').addEventListener('click', clicked);
// make click function        
        function clicked() {
// do the conversions              
        let windSpeedmph = json.wind.speed, windSpeedKmh = 0, windSpeed = 0;
        let tempC = json.main.temp, tempF = 0, temp = 0;   
// convert celecius to farenheiat
        tempF = (tempC * 1.8000) + 32;
        temp = tempF.toFixed(2);
        temp += "%F";
        console.log("tempF " + temp);
// convert windspeed
        windSpeedKmh = windSpeedmph * 1.61;
        windSpeed = windSpeedKmh.toFixed(2);
        windSpeed += "KMPH";
        console.log("windspeed " + windSpeed + " and temp " + temp);
// display new html on dom when clicked        
         document.getElementById("weatherArray").innerHTML = `<p class="weatherClass" id="weatherArray">${json.weather[0].main.toUpperCase()} ${json.weather[0].description}<br /><img><br />Temp ${temp}<br />Clouds ${json.clouds.all}% Wind Speeed ${windSpeed}</p>
         `;
        }
    }, 3000);
}

