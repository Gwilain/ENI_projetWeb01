document.addEventListener('DOMContentLoaded', initMap);
let map;

function initMap(){
    map = L.map('map').setView([46.603354, 1.888334], 6.5);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    fetch(dataPath).then(response=>response.json()).then(data=>initMarkers(data));

}


function initMarkers(data){

    let marker = L.marker([47.183017,-1.532262]).addTo(map);

    data.users.forEach(el => {

        console.log("el.coordonnees.longitude = "+el.coordonnees.longitude);
        console.log("el.coordonnees.latitude = "+el.coordonnees.latitude);
        

        let long = Number( el.coordonnees.longitude);
        let lat = Number(el.coordonnees.latitude);
       
        let marker = L.marker([lat, long]).addTo(map);

        let name = el.nom;
        let firstname = el.prenom;


        marker.bindPopup("<b class='nom'>"+name+"</b> <br>"+firstname).openPopup();


    });



}

/* 
"latitude": "47.183017",
        "longitude": "-1.532262" */