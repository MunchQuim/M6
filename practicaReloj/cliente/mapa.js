let now = new Date();

let map = L.map('map').setView([41.39, 2.154007], 10); // Set to London coordinates
let key = "S8JYPFU8T5FT";
let user = "munch";

let data;
let time;
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.addEventListener('click', async (event) => {


  let lat = event.latlng.lat;
  let lng = event.latlng.lng;

  const apiKey = key; // Reemplaza con tu API Key de TimeZoneDB
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    data = await response.json();

    if (data.status === "OK") {
      const formattedDateString = data.formatted.replace(" ", "T"); // Reemplazamos el espacio por "T"
      time = new Date(formattedDateString);

      console.log(time.getHours()+":"+time.getMinutes());
      
    } else {
      console.error("Error:", data.message);
      alert("Para el carro, dale un momento para respirar")
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }

  


}, false);

//timezoneDB munch FinnElHumano
async function getTimezone(lat, lng) {



}


