const originFormEle = document.querySelector(".origin-form");
const originlistEle = document.querySelector(".origins");
const access_token = 'pk.eyJ1Ijoic2FnYXJ0aGtrYXIiLCJhIjoiY2thNWx4d2loMDFvazNscGJldzJpaXc1MCJ9.Xl71FBbAakX8PzwqfbX1DQ';

originFormEle.addEventListener("submit", function(e) {
    const query = e.target.querySelector("input");
    displayResult(query.value);
    e.preventDefault();
})

function displayResult(query) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${access_token}&limit=10&&bbox=-97.325875,49.766204,-96.953987,49.99275`)
        .then(resp => resp.json())
        .then(data => {
            originlistEle.innerHTML = "";
            locationsHTML = ""
            data.features.forEach(location => {
                console.log(location)
                locationsHTML += `<li data-long="${location.center[0]}" data-lat="${location.center[1]}" class="selected">
                  <div class="name">${location.text}</div>
                  <div>${location.properties.address === undefined ? location.context[2].text:location.properties.address}</div>
                </li>`
            });
            originlistEle.innerHTML = locationsHTML;
        })
}