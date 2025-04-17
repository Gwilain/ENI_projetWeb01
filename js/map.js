document.addEventListener('DOMContentLoaded', initMap);
let map;

function initMap(){

    const tiles = new Map();
    tiles["light"] = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    tiles["dark"] = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    urlMap = tiles[ localStorage.getItem("theme") ];

    map = L.map('map').setView([46.603354, 1.888334], 6);
    
    L.tileLayer(urlMap, {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
      
   fetch(dataPath).then(response=>response.json()).then(data=>initMarkers(data));

}


function initMarkers(data){

    data.users.forEach(el => {
        let long = Number( el.coordonnees.longitude);
        let lat = Number(el.coordonnees.latitude);

        let icon = L.icon({
            iconUrl: 'images/marker.png',
            iconSize: [36, 53],
            iconAnchor: [16, 53],
            popupAnchor: [1, -44],
            shadowUrl: null
        }); 

        let marker = L.marker([lat, long], { icon: icon }).addTo(map);

        let name = el.nom;
        let firstname = el.prenom;
        marker.bindPopup("<b class='nom'>"+name+"</b> <br>"+firstname);


    });
}