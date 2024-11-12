
const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos

// Función para comprobar si los datos han expirado
function isSessionExpired() {
  
  const timestamp = sessionStorage.getItem("timestamp");
  if (!timestamp){
    console.log("no existente");
    return true; // Si no hay timestamp, significa que los datos nunca fueron guardados.
  } 

  const currentTime = new Date().getTime();
  console.log(currentTime - timestamp > EXPIRATION_TIME);
  return currentTime - timestamp > EXPIRATION_TIME;
}

// Verificamos si los datos han expirado o no existen
if (isSessionExpired()|| sessionStorage.getItem("lat") === null) {
  console.log("hola");
  // Si los datos han expirado o no existen, los volvemos a establecer
  sessionStorage.setItem("lat", 41.39);
  sessionStorage.setItem("lng", 2.154007);
  sessionStorage.setItem("timestamp", new Date().getTime()); // Guardamos el timestamp actual
}

let lat = sessionStorage.getItem("lat");
let lng = sessionStorage.getItem("lng");

let now = new Date();
let map = L.map('map').setView([lat, lng], 2);

let key = "S8JYPFU8T5FT";// para la api de obtener el tiempo // lo pondria como variable de entorno
let user = "munch";

let data;
let time;


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.addEventListener('click', async (event) => {
  lat = event.latlng.lat;
  lng = event.latlng.lng;

  sessionStorage.setItem("lat", lat);
  sessionStorage.setItem("lng", lng);
  
  await getTimezone(lat, lng);
}, false);

async function getTimezone(lat, lng) {
  const apiKey = key; // Reemplaza con tu API Key de TimeZoneDB
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    data = await response.json();

    if (data.status === "OK") {
      const formattedDateString = data.formatted.replace(" ", "T"); // Reemplazamos el espacio por "T"
      time = new Date(formattedDateString);

      hora = time.getHours();
      minutos = time.getMinutes();
      segundos = time.getSeconds();

      fecha = time;

      manecillas[0].angulo = hora*manecillas[0].paso;
      manecillas[1].angulo = minutos*manecillas[1].paso;
      manecillas[2].angulo = segundos*manecillas[2].paso;

      console.log(hora + ":" + minutos);
      //llamar a crearse el reloj;
      crearRelojAnalogico();
      crearRelojDigital();

    } else {
      console.error("Error:", data.message);
      alert("Para el carro, dale un momento para respirar")
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}


getTimezone(lat, lng);


