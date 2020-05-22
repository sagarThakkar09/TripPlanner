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

        })
}