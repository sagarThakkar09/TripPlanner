const originFormEle = document.querySelector(".origin-form");
const destinationFromEle = document.querySelector(".destination-form");
const originlistEle = document.querySelector(".origins");
const destinationlistEle = document.querySelector(".destinations");
const tripButtonEle = document.querySelector("button");
let originCordLong;
let originCordLat;
let destinationCordLong;
let destinationCordLat;
const access_token = 'pk.eyJ1Ijoic2FnYXJ0aGtrYXIiLCJhIjoiY2thNWx4d2loMDFvazNscGJldzJpaXc1MCJ9.Xl71FBbAakX8PzwqfbX1DQ';
const transitKey = `yywi4QKxinQ3PzCgMK6u`;

getLocation(originFormEle, originlistEle);
getLocation(destinationFromEle, destinationlistEle);

function getLocation(location, list) {
    location.addEventListener("submit", function(e) {
        const query = e.target.querySelector("input");
        displayResult(query.value, list);
        e.preventDefault();
    })
}

function displayResult(query, list) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${access_token}&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`)
        .then(resp => resp.json())
        .then(data => {
            list.innerHTML = "";
            locationsHTML = ""
            data.features.forEach(location => {
                locationsHTML += `<li data-long="${location.center[0]}" data-lat="${location.center[1]}" class="">
                  <div class="name">${location.text}</div>
                  <div>${location.properties.address === undefined ? location.context[2].text:location.properties.address}</div>
                </li>`
            });
            list.innerHTML = locationsHTML;
        })
}

originlistEle.addEventListener("click", function(e) {
    const listELe = e.target.closest('li');
    const liEle = document.querySelectorAll(".origins li");
    liEle.forEach(sle => {
        sle.classList.remove("selected");
    })
    listELe.classList.add("selected")
    originCordLong = listELe.dataset.long;
    originCordLat = listELe.dataset.lat;
})

destinationlistEle.addEventListener("click", function(e) {
    const listELe = e.target.closest('li');
    const liEle = document.querySelectorAll(".destinations li");
    liEle.forEach(sle => {
        sle.classList.remove("selected");
    })
    listELe.classList.add("selected")
    destinationCordLong = listELe.dataset.long;
    destinationCordLat = listELe.dataset.lat;
})

tripButtonEle.addEventListener("click", function(e) {
    fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?api-key=${transitKey}&origin=geo/${originCordLat},${originCordLong}&destination=geo/${destinationCordLat},${destinationCordLong}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
})