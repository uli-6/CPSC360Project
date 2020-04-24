const express = require('express'); //import express
const appserver = express();//initialize express
const earthquakeData = require('./earthquakes.json');//import employee data
const cors = require('cors'); //import cors package
								//install: npm i --save cors
                                //easily publish API and receive query


//-----USING CORS
//to query: http://localhost:8000/employees/?lastname=doe
appserver.use(cors());//enable cors

//this is triggered when a request comes in
appserver.get('/earthquake',function(request,response){//get client request
	//store query string parameter	console.log(request.query);
	//console.log(request);
    console.log(request.query);
    let howMany = request.query.howMany;
    howMany = parseInt(howMany);
    let what = request.query.what;
    what = parseInt(what);
    let minMag = request.query.minMag;
    minMag = parseFloat(minMag);
    let maxMag = request.query.maxMag;
    maxMag = parseFloat(maxMag);
    let timeframe = request.query.timeframe;
    timeframe = parseInt(timeframe);
    let country = request.query.country;
    
    let retobjar = [];
    let temp = [];
    let amount = 0;
    let t = 0;
    // milliseconds in a hour, day, week, month
    // to find in the timeframe,  get current time and substract by hour or day or week or month
    // then if the earthquake time is in between those two it gets it.
    const now = Date.now();
    let hourMil = 3600000;
    hourMil = now - hourMil;
    let dayMil = 86400000;
    dayMil = now - dayMil;
    let weekMil = 604800000;
    weekMil = now - weekMil;
    let monthMil = 2592000000;
    monthMil = now - monthMil;
    //console.log(now);

	//loop through data array
	for(let i=0; i<earthquakeData.features.length; i++){
        if(!country){
            
        }else{
            place = earthquakeData.features[i].properties.place;
            placeCheck = place.indexOf(country) !== -1;
            if (placeCheck){
                // checks if the location matches
                mag = earthquakeData.features[i].properties.mag;
                //console.log(mag)
                
                if (what == 0){
                    // if we are searching fro most recent
                    if (mag > minMag && mag < maxMag){
                        temp.push(earthquakeData.features[i]);                        
                        amount = amount + 1;
                        retobjar.push(earthquakeData.features[i]);
                    }
                }else if (what == 1){
                    // highest mag and specific timeframe
                    t = earthquakeData.features[i].properties.time;
                        if (timeframe == 0){
                            if (t > hourMil && t < now){
                                amount = amount + 1;
                                //console.log(place);
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 1){
                            if (t > dayMil && t < now){
                                amount = amount + 1;
                                //console.log(place);
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 2){
                            if (t > weekMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 3){
                            if (t > monthMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else{
                            amount = amount + 1;
                            retobjar.push(earthquakeData.features[i]);
                        }
                }else{
                    if (mag > minMag && mag < maxMag){
                        // option with no what
                        t = earthquakeData.features[i].properties.time;
                        if (timeframe == 0){
                            if (t > hourMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 1){
                            if (t > dayMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 2){
                            if (t > weekMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else if (timeframe == 3){
                            if (t > monthMil && t < now){
                                amount = amount + 1;
                                retobjar.push(earthquakeData.features[i]);
                            }
                        }else{
                            amount = amount + 1;
                            retobjar.push(earthquakeData.features[i]);
                        }
                    }
                }
            }
            if (amount == howMany){
                // only the amount selected
                break;
            }
        }
    }

    if (what == 0){
        // sorts for most recent object
        retobjar.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }else if (what == 1){
        //searches for the highest magnitude
        retobjar.sort(function(a, b) { 
            return a.properties.mag - b.properties.mag;
          });
    }

	if (retobjar.length==0){
		return response.send({"status": "error", "message" : "No Matching Results."});
	} else{
        //console.log("AAAAAAAAAAAAA")
		return response.send(JSON.stringify(retobjar));
    }
    
});


//listen to port 8000
appserver.listen(8000, function(){
	console.log('Listening on port 8000...');
});