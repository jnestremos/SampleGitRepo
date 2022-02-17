const express = require('express');
const app = express();
const weather = require('weather-js');
const abbr = require( '@stdlib/datasets-us-states-abbr' );

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    weather.find({search: 'Cape Town', degreeType: 'C'}, function(err, result) {
        if(err){
            console.log(err)
        } 
        else{                      
            var states = abbr()        
            var country =  result[0].location.name.split(", ")
            country = country[country.length - 1]                        
            if(states.filter(state => state == country).length != 0){
                country = "The United States of America"
            }                  
            let data = {                
                'name': result[0].location.name,
                'country': "https://countryflagsapi.com/png/" + country,
                'lat': parseFloat(result[0].location.lat),
                'long': parseFloat(result[0].location.long),
                'current': {
                    'temp': result[0].current.temperature,
                    'skytext': result[0].current.skytext,
                    'date': result[0].current.date,                    
                    'day': result[0].current.day,                    
                },
                'forecast': result[0].forecast,            
            } 
            console.log(result[0])                                    
            res.render('index', data);
        }        
      });
  });

app.get('/other', (req, res) => {
    res.render('other');
  });
  

app.listen(8000);

// {
//     "location": {
//       "name": "San Francisco, CA",
//       "lat": "37.78",
//       "long": "-122.42",
//       "timezone": "-7",
//       "alert": "",
//       "degreetype": "F",
//       "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
//     },
//     "current": {
//       "temperature": "60",
//       "skycode": "31",
//       "skytext": "Clear",
//       "date": "2022-02-16",
//       "observationtime": "23:45:00",
//       "observationpoint": "San Francisco, CA",
//       "feelslike": "61",
//       "humidity": "38",
//       "winddisplay": "10 mph West",
//       "day": "Wednesday",
//       "shortday": "Wed",
//       "windspeed": "10 mph",
//       "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/31.gif"
//     },
//     "forecast": [
//       {
//         "low": "48",
//         "high": "59",
//         "skycodeday": "31",
//         "skytextday": "Clear",
//         "date": "2022-02-15",
//         "day": "Tuesday",
//         "shortday": "Tue",
//         "precip": ""
//       },
//       {
//         "low": "50",
//         "high": "63",
//         "skycodeday": "32",
//         "skytextday": "Sunny",
//         "date": "2022-02-16",
//         "day": "Wednesday",
//         "shortday": "Wed",
//         "precip": "0"
//       },
//       {
//         "low": "46",
//         "high": "64",
//         "skycodeday": "32",
//         "skytextday": "Sunny",
//         "date": "2022-02-17",
//         "day": "Thursday",
//         "shortday": "Thu",
//         "precip": "0"
//       },
//       {
//         "low": "46",
//         "high": "63",
//         "skycodeday": "32",
//         "skytextday": "Sunny",
//         "date": "2022-02-18",
//         "day": "Friday",
//         "shortday": "Fri",
//         "precip": "0"
//       },
//       {
//         "low": "48",
//         "high": "61",
//         "skycodeday": "32",
//         "skytextday": "Sunny",
//         "date": "2022-02-19",
//         "day": "Saturday",
//         "shortday": "Sat",
//         "precip": "0"
//       }
//     ]
//   }