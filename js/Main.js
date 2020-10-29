var buttonClicked = document.getElementById("viewResultButton");

buttonClicked.addEventListener('click', function(){
    var date = dateSelectedByUser.value;
    switch(getRadioButtonValue()){
        case "apod":
            astronomyPictureOfTheDay(date);
            break;
        case "mars":
            marsRoverPhotos(date);
            break;
        default:
            break;
    }
});

// The following function will return the selected value from the radio button
function getRadioButtonValue(){
    var elementId = document.getElementsByName("radio-button");
    var selectedValue;
    for(var i = 0; i < elementId.length; i++){
        if(elementId[i].checked){
            selectedValue = elementId[i].value;
        }
    }
    return selectedValue;
}

// The next section will set the mximum, minimum date and that the starting value 
// will be todays value 
var dateSelectedByUser = document.getElementById("date");
dateSelectedByUser.min = "2012-08-06"; 
dateSelectedByUser.max = getDate();    
dateSelectedByUser.value = getDate();

function getDate(){
    var today = new Date();
    var day = today.getDate() - 1;
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    today = year + "-" + month + "-" + day;
    return today;
}

// The following function will clear the the current displaying images (if any!)
function clearImages(){
    $("#images").empty();
}

// Making the call for the Astronomy Picture of the Day api
async function getApodApiValues(date){
    var url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=SBKevcG768MK5onmbWnRVvvp0Ysbssszq1BO8EYX`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function displayingApodImage(arr){
    var element = document.getElementById("images");
    for(var i = 0; i < arr.length; i++){
        if(arr.length <= 7){
            element.innerText = "Something went wrong, please choose another date!";
            break;
        }
        else if(i == 7){
            var img = new Image(500, 500);
            img.src = arr[i];
            element.appendChild(img);
        }
    }
}

function displayingApodDescription(arr){
    var element = document.getElementById("images");
    for(var i = 0; i < arr.length; i++){
        if(arr.length <= 7){
            element.innerText = "Something went wrong, please choose another date!";
            break;
        }
        else if(i == 2){
            const desrciption = document.createElement("p");
            desrciption.classList.add("picture-description");
            desrciption.innerText = arr[i];
            element.appendChild(desrciption);
        }
    }
}

function displayingApodImageTitle(arr){
    var element = document.getElementById("images");
    for(var i = 0; i < arr.length; i++){
        if(arr.length <= 7){
            element.innerText = "Something went wrong, please choose another date!";
            break;
        }
        else if(i == 6){
            const title = document.createElement("p");
            title.classList.add("picture-title");
            title.innerText = "Title: " + arr[i];
            element.appendChild(title);
        }
    }
}

function astronomyPictureOfTheDay(date){
    var arr = [];
    var element = document.getElementById("images");

    getApodApiValues(date).then(data => {
        Object.values(data).forEach(x => arr.push(x));
        clearImages();
        displayingApodImage(arr);
        displayingApodImageTitle(arr);
        displayingApodDescription(arr);
    }).catch(function(){
        element.innerText = "Sorry, there are no photos on this date! Pick another";
    });
}

// Making the call for the Mars Rover Photos api
async function getMarsApiValues(date){
    var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=SBKevcG768MK5onmbWnRVvvp0Ysbssszq1BO8EYX`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function displayingMarsValues(arr){
    var element = document.getElementById("images");
    for(var i = 0; i < 5; i++){
        var img = new Image(500, 500);
        const div = document.createElement("div");
        div.classList.add("rover");
        const label = document.createElement("div");
        label.classList.add("rover-info");

        img.src = arr[i].img_src;
        label.innerText = "Camera: " + arr[i].camera.name;
        label.innerText += " - Rover: " + arr[i].rover.name;
        label.innerText += " - Status: " + arr[i].rover.status;

        div.appendChild(img);
        div.appendChild(label);
        element.appendChild(div);
    }
}

function marsRoverPhotos(date){
    var arr = [];
    var element = document.getElementById("images");

    getMarsApiValues(date).then(data => {
        Object.values(data).forEach(x => arr = x);
        clearImages();
        displayingMarsValues(arr);
    }).catch(function(){
        element.innerText = "Sorry, there are no photos on this date! Pick another";
    });
}