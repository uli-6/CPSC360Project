//--THIS PART OF CODE KEEPS JAVASCRIPT VARIABLE UPDATED TO FORM INPUT--//
//select text input in form and store to a variable
const textInputHowMany = document.getElementById('howMany');
const textInputWhat = document.getElementById('what');
const textInputMinMag = document.getElementById('minMag');
const textInputMaxMag = document.getElementById('maxMag');
const textInputTimeframe = document.getElementById('timeframe');
const textInputCountry = document.getElementById('country');

let howMany = textInputHowMany.value;
let what = textInputWhat.value;
let minMag = textInputMinMag.value;
let maxMag = textInputMaxMag.value;
let timeframe = textInputTimeframe.value;
let country = textInputCountry.value;
/*addEventListener
Inputs:
	1. event : event can be any valid JavaScript event.Events are used without â€œonâ€ prefix like use â€œclickâ€ instead of â€œonclickâ€ or â€œmousedownâ€ instead of â€œonmousedownâ€.
	2. listener(handler function) : It can be a JavaScript function which respond to the event occur.
*/
//this updates the variable lastname when there is a change in input event
textInputHowMany.addEventListener('input', function(e){
    howMany = e.target.value;
})

textInputWhat.addEventListener('input', function(e){
    what = e.target.value;
})

textInputMinMag.addEventListener('input', function(e){
    minMag = e.target.value;
})

textInputMaxMag.addEventListener('input', function(e){
    maxMag = e.target.value;
})

textInputTimeframe.addEventListener('input', function(e){
    timeframe = e.target.value;
})

textInputCountry.addEventListener('input', function(e){
    country = e.target.value;
})

//--THIS PART OF CODE RETRIEVES INPUT FROM FORM WHEN SUBMITTED--//
// querySelector selects the form item from the html document that uses this scripts
//return: HTMLElement object representing the first element match
//parameter: CSS selector string
const form = document.querySelector('form');

//this listens to event when "Submit" is clicked
form.addEventListener('submit', function(e) {
			// listener: prevent form default behavior
			//e: event
			e.preventDefault();//prevent default action if not handled explicitly
			
			//make request to API using axios
			//axios lets us easily get API request
			//make sure to include axios CDN in html
			axios.get(
                "http://localhost:8000/earthquake/?howMany=" + howMany + "&what=" + what + "&minMag="+ minMag + 
                "&maxMag=" + maxMag + "&timeframe=" + timeframe + "&country=" + country).then(function(resp){
							outputdata(resp);}).catch(function(error){
                                console.log(error);})
                                
            axios.get(
                "http://localhost:8000/earthquake/?"
            )

			textInput.value="";//clear form input box
			}	
)

function outputdata(resp){
	//resp.data will be array of employee objects 
	//console.log(resp.data);
	//console.log(resp.data.length)	
	
	//display results in HTML page
	let outputheading = document.querySelector('.outputheading');
	let employeedata = document.querySelector('.employeedata');
	let errormsg = document.querySelector('.error-message');
	//console.log(resp.data.firstname);	
	
	let peoplelist=[];
    let returnstr="";
	
    //response will be an array of employee objects, display each item
    
    if (resp.data.length){
        for(i = 0; i < resp.data.length; i++){
            // formats the dates and makes the string for the website
            a = new Date(resp.data[i].properties.time)
            formattedDate = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() 
            returnstr = resp.data[i].properties.title + " on " + formattedDate
            peoplelist.push(returnstr)
        }
        outputheading.innerHTML = "Earthquakes";
        employeedata.innerHTML = peoplelist.join("\n");
		errormsg.innerHTML="";
    }else{
        errormsg.innerHTML = "No Ressults Found"
    }
} 