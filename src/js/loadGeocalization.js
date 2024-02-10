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

            // Agrega el circuito al mapa
            agregarCircuito();
            agregarCircuito2();
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
// Coordenadas del circuito de ejemplo en Palma
const circuitoPalma = [
    { lat: 39.5737, lng: 2.6502 }, // Punto inicial
    { lat: 39.5705, lng: 2.6497 }, // Punto intermedio
    { lat: 39.5723, lng: 2.6421 }, // Punto intermedio
    { lat: 39.5749, lng: 2.6426 }, // Punto intermedio
    { lat: 39.5737, lng: 2.6502 }  // Punto final
];
// Coordenadas del circuito de ejemplo en la Serra de Tramuntana
const rutaTramuntana = [
    { lat: 39.562075, lng: 2.624678 },
    { lat: 39.560189, lng: 2.623326 },
    { lat: 39.558518, lng: 2.622532 },
    { lat: 39.558750, lng: 2.621170 },
    { lat: 39.559908, lng: 2.619453 },
    { lat: 39.561304, lng: 2.620252 },
    { lat: 39.561568, lng: 2.620338 },
    { lat: 39.561734, lng: 2.620081 },
    { lat: 39.562379, lng: 2.620145 },
    { lat: 39.562379, lng: 2.620145 },
    { lat: 39.563047, lng: 2.619807 },
    { lat: 39.563901, lng: 2.620016 },
    { lat: 39.564414, lng: 2.619823 },
    { lat: 39.564811, lng: 2.619244 },
    { lat: 39.565456, lng: 2.615532 },
    { lat: 39.565770, lng: 2.615103 },
    { lat: 39.566018, lng: 2.615017 },
    { lat: 39.566316, lng: 2.615145 },
    { lat: 39.567143, lng: 2.616433 },
    { lat: 39.567193, lng: 2.616755 },
    { lat: 39.567027, lng: 2.618128 },
    { lat: 39.567060, lng: 2.618386 },
    { lat: 39.569211, lng: 2.621261 },
    { lat: 39.569310, lng: 2.621540 },
    { lat: 39.569169, lng: 2.623069 },
    { lat: 39.568979, lng: 2.623369 },
    { lat: 39.568863, lng: 2.623455 },
    { lat: 39.567329, lng: 2.623568 },
    { lat: 39.567131, lng: 2.623793 },
    { lat: 39.567131, lng: 2.625134 },
    { lat: 39.565990, lng: 2.625091 },
    { lat: 39.565758, lng: 2.626593 },
    { lat: 39.563384, lng: 2.6257734 },
    { lat: 39.56325, lng: 2.625022 }
];

const rutaCampastilla = [
    { lat: 39.534639, lng: 2.717064 },
    { lat: 39.534772, lng: 2.718438 },
    { lat: 39.535417, lng: 2.719017 },
    { lat: 39.534970, lng: 2.720583 },
    { lat: 39.534186, lng: 2.721761 },
    { lat: 39.530560, lng: 2.728437 },
    { lat: 39.517219, lng: 2.743908 },
    { lat: 39.510416, lng: 2.749272 },
    { lat: 39.510399, lng: 2.749251 },
    { lat: 39.511723, lng: 2.753457 },
    { lat: 39.512452, lng: 2.753006 },
    { lat: 39.514637, lng: 2.750774 },
    { lat: 39.515928, lng: 2.749916 },
    { lat: 39.519073, lng: 2.749079 },
    { lat: 39.522251, lng: 2.746333 },
    { lat: 39.522880, lng: 2.746644 },
    { lat: 39.523667, lng: 2.746279 },
    { lat: 39.526952, lng: 2.742427 },
    { lat: 39.527589, lng: 2.742256 },
    { lat: 39.529493, lng: 2.738372 },
    { lat: 39.532107, lng: 2.735926 },
    { lat: 39.532852, lng: 2.733887 },
    { lat: 39.532753, lng: 2.733351 },
    { lat: 39.530618, lng: 2.730111 },
    { lat: 39.532372, lng: 2.727321 },
    { lat: 39.534408, lng: 2.725261 },
    { lat: 39.535814, lng: 2.722107 }
];



// Agrega el circuito al mapa
function agregarCircuito() {
    const circuitoPolyline = new google.maps.Polyline({
        path: rutaTramuntana,
        geodesic: true,
        strokeColor: 'green',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    const iconSize = new google.maps.Size(40, 40); // Dimensiones deseadas del icono
    const iconScaledSize = new google.maps.Size(40, 40);
    //marcador de inicio
    const marker = new google.maps.Marker({
        position: rutaTramuntana[0],
        map: mapa,
        title: 'Inicio',
        icon: {
            url: './assets/geolocalizacion/finish.png',
            scaledSize: iconScaledSize
        }
    });
    //marcador de final
    const marker2 = new google.maps.Marker({
        position: rutaTramuntana[rutaTramuntana.length - 1],
        map: mapa,
        title: 'Final',
        icon: {
            url: './assets/geolocalizacion/corriendo.png',
            scaledSize: iconScaledSize
        }
    });
    circuitoPolyline.setMap(mapa);
}

function agregarCircuito2() {
    const circuitoPolyline = new google.maps.Polyline({
        path: rutaCampastilla,
        geodesic: true,
        strokeColor: 'green',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    const iconSize = new google.maps.Size(40, 40); // Dimensiones deseadas del icono
    const iconScaledSize = new google.maps.Size(40, 40);
    //marcador de inicio
    const marker = new google.maps.Marker({
        position: rutaCampastilla[0],
        map: mapa,
        title: 'Inicio',
        icon: {
            url: './assets/geolocalizacion/bici.png',
            scaledSize: iconScaledSize
        }
    });
    //marcador de final
    const marker2 = new google.maps.Marker({
        position: rutaCampastilla[rutaCampastilla.length - 1],
        map: mapa,
        title: 'Final',
        icon: {
            url: './assets/geolocalizacion/finish.png',
            scaledSize: iconScaledSize
        }
    });
    circuitoPolyline.setMap(mapa);
}
