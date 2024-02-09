// Variable global para almacenar las coordenadas
var coordenadas;
var mapa;
var marcador;
var directionsDisplay;

// Inicializa y añade el mapa de mi ubicación actual
async function initMap() {
    // Verifica si el navegador soporta geolocalización
    var geolocalizacion = navigator.geolocation;

    if (geolocalizacion) {
        try {
            // Obtiene la posición del usuario
            const position = await getPosition();
            const { latitude: latitud, longitude: longitud } = position.coords;

            // Almacena las coordenadas
            coordenadas = {
                lat: latitud,
                lng: longitud
            };

            // Crea el mapa centrado en las coordenadas del usuario
            mapa = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: coordenadas
            });

            // Coloca un marcador en la ubicación del usuario
            marcador = new google.maps.Marker({
                position: coordenadas,
                map: mapa
            });

            // Inicializa el renderer de direcciones
            directionsDisplay = new google.maps.DirectionsRenderer();
        } catch (error) {
            console.error('Error al obtener la posición:', error);
        }
    }
}

// Obtiene la posición del usuario como una promesa
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Verifica si la página actual es location.html y llama a initMap
if (window.location.pathname === '/dist/location.html') {
    initMap();
}

// Añade event listeners para los diferentes modos de transporte
if (document.getElementById('caminar')) {
    document.getElementById('caminar').addEventListener('click', caminar);
}
if (document.getElementById('conduciendo')) {
    document.getElementById('conduciendo').addEventListener('click', conduciendo);
}
if (document.getElementById('bus')) {
    document.getElementById('bus').addEventListener('click', bus);
}

// Obtiene la ruta para el modo de transporte especificado
function obtenerRuta(modoViaje) {
    // Borra la ruta anterior si existe
    if (directionsDisplay) {
        directionsDisplay.setMap(null);
    }
    // Borra el marcador anterior si existe
    marcador.setMap(null);

    // Dirección de destino
    var destino = 'CIFP Francesc de Borja Moll Carrer de Caracas, 6, Illes Balears, Spain';

    // Configuración de la solicitud de ruta
    var objConfigDS = {
        origin: coordenadas,
        destination: destino,
        travelMode: modoViaje,
    };

    // Servicio de direcciones
    var ds = new google.maps.DirectionsService();

    // Solicitar la ruta
    ds.route(objConfigDS, function (resultados, status) {
        if (status === 'OK') {
            // Muestra la ruta en el mapa
            directionsDisplay.setDirections(resultados);
            directionsDisplay.setMap(mapa);
        } else {
            // Muestra una alerta en caso de error
            alert('Error al obtener la ruta: ' + status);
        }
    });
}

// Funciones para obtener rutas según el modo de transporte
function conduciendo() {
    obtenerRuta(google.maps.TravelMode.DRIVING);
}

function bus() {
    obtenerRuta(google.maps.TravelMode.TRANSIT);
}

function caminar() {
    obtenerRuta(google.maps.TravelMode.WALKING);
}
