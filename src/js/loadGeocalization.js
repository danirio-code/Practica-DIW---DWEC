var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkC6pbBurlf8H94KXQMUjARKy18kzm9Vw&callback=initMap';
script.async = true;
script.defer = true;
document.head.appendChild(script);
var coordenadas; // Variable global para almacenar las coordenadas
var mapa;
var marcador;
var directionsDisplay; // Variable global para mostrar la ruta
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
// Inicializa y añade el mapa de mi ubicación actual
async function initMap() {
    var geolocalizacion = navigator.geolocation;

    if (geolocalizacion) {
        geolocalizacion.getCurrentPosition(function (position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;

            coordenadas = {
                lat: latitud,
                lng: longitud
            };

            mapa = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: coordenadas
            });

            marcador = new google.maps.Marker({
                position: coordenadas,
                map: mapa
            });

            directionsDisplay = new google.maps.DirectionsRenderer(); // Inicializar el renderer de direcciones
        });
    }
}
if (document.getElementById('caminar')) {
    document.getElementById('caminar').addEventListener('click', caminar);
}
if (document.getElementById('conduciendo')) {
    document.getElementById('conduciendo').addEventListener('click', conduciendo);
}
if (document.getElementById('bus')) {
    document.getElementById('bus').addEventListener('click', bus);
}
function caminar() {
    // Borramos la ruta anterior
    if (directionsDisplay) {
        directionsDisplay.setMap(null);
    }
    marcador.setMap(null);
    // Creamos una nueva ruta
    var objInformacion = {
        address: 'CIFP Francesc de Borja Moll Carrer de Caracas, 6, Illes Balears, Spain'
    };

    var objConfigDS = {
        origin: coordenadas,
        destination: objInformacion.address,
        travelMode: google.maps.TravelMode.WALKING,
    };

    var ds = new google.maps.DirectionsService();

    ds.route(objConfigDS, function (resultados, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(resultados); // Mostramos la nueva ruta
            directionsDisplay.setMap(mapa);
        } else {
            alert('Error' + status);
        }
    });
}

function conduciendo() {
    // Borramos la ruta anterior
    if (directionsDisplay) {
        directionsDisplay.setMap(null);
    }
    //borramos el marcador
    marcador.setMap(null);

    // Creamos una nueva ruta
    var objInformacion = {
        address: 'CIFP Francesc de Borja Moll Carrer de Caracas, 6, Illes Balears, Spain'
    };

    var objConfigDS = {
        origin: coordenadas,
        destination: objInformacion.address,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    var ds = new google.maps.DirectionsService();

    ds.route(objConfigDS, function (resultados, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(resultados);
            directionsDisplay.setMap(mapa);
        } else {
            alert('Error' + status);
        }
    });
}
function bus() {
    // Borramos la ruta anterior
    if (directionsDisplay) {
        directionsDisplay.setMap(null);
    }
    //borramos el marcador
    marcador.setMap(null);

    // Creamos una nueva ruta
    var objInformacion = {
        address: 'CIFP Francesc de Borja Moll Carrer de Caracas, 6, Illes Balears, Spain'
    };

    var objConfigDS = {
        origin: coordenadas,
        destination: objInformacion.address,
        travelMode: google.maps.TravelMode.TRANSIT,
    };

    var ds = new google.maps.DirectionsService();

    ds.route(objConfigDS, function (resultados, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(resultados);
            directionsDisplay.setMap(mapa);
        } else {
            alert('Error' + status);
        }
    });
}