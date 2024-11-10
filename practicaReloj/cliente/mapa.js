let now = new Date();
let lat = 41.39;
let lng = 2.154007;
let map = L.map('map').setView([lat, lng], 10);
let key = "S8JYPFU8T5FT";
let user = "munch";

let data;
let time;


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.addEventListener('click', async (event) => {

  console.log("click");
  lat = event.latlng.lat;
  lng = event.latlng.lng;
  
  await getTimezone(lat, lng);




}, false);

async function getTimezone(lat, lng) {
  console.log("entrando en timezone");
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


