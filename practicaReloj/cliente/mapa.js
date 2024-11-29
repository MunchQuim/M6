
const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos

// Función para comprobar si los datos han expirado
function isSessionExpired() {

  const timestamp = sessionStorage.getItem("timestamp");
  if (!timestamp) {
    console.log("no existente");
    return true; // Si no hay timestamp, significa que los datos nunca fueron guardados.
  }

  const currentTime = new Date().getTime();
  console.log(currentTime - timestamp > EXPIRATION_TIME);
  return currentTime - timestamp > EXPIRATION_TIME;
}

// Verificamos si los datos han expirado o no existen
if (isSessionExpired() || sessionStorage.getItem("lat") === null) {
  console.log("hola");
  // Si los datos han expirado o no existen, los volvemos a establecer
  sessionStorage.setItem("lat", 41.39);
  sessionStorage.setItem("lng", 2.154007);
  sessionStorage.setItem("timestamp", new Date().getTime()); // Guardamos el timestamp actual
}

let lat = sessionStorage.getItem("lat");
let lng = sessionStorage.getItem("lng");

let map = L.map('map', {
  minZoom: 3, maxZoom: 10,
  /*   maxBounds:[[-85,-9999999],[85,9999999]],
   */
}).setView([lat, lng], 3);

let key = "S8JYPFU8T5FT";// para la api de obtener el tiempo // lo pondria como variable de entorno
let user = "munch";

let data;
let time;


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


map.addEventListener('click', async (event) => {
  lat = Math.floor(event.latlng.lat*10000)/10000;
  lng = Math.floor(event.latlng.lng*10000)/10000;
  sessionStorage.setItem("lat", lat);
  sessionStorage.setItem("lng", lng);
  console.log(lat+":"+lng);
  await getTimezone(lat, lng);
}, false);

async function getTimezone(lat, lng) {
  const apiKey = key; // Reemplaza con tu API Key de TimeZoneDB
  let url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  
  try {
    const response = await fetch(url);
    data = await response.json(); // de aqui puedo sacar el region name para el nombre de la hubicacion
    console.log(data);
    if (data.status === "OK") {
      const formattedDateString = data.formatted.replace(" ", "T"); // Reemplazamos el espacio por "T"
      time = new Date(formattedDateString);

      //cambiar a partir de aqui
      //hora minutos y segundos son el tiempo local en españa

      // recoger la zona horaria;
      let zona = data.regionName;
      countryName = data.countryName;
      let huso = data.gmtOffset;
      /* alert(zona); */

      let ahora = new Date(Date.now());
      let gmtPropio = 3600;
      hora = Math.floor(ahora.getHours() - (gmtPropio / 3600) + (huso / 3600)); // es hora en utc 0
      if (hora >= 24) {
        hora -= 24;
      }
      minutos = ahora.getMinutes() + (huso % 3600 / 60); // modificar para los utc fraccionales
      segundos = ahora.getSeconds();


      fecha = time;

      manecillas[0].angulo = hora * manecillas[0].paso;
      manecillas[1].angulo = minutos * manecillas[1].paso;
      manecillas[2].angulo = segundos * manecillas[2].paso;

      console.log(hora + ":" + minutos);
      //llamar a crearse el reloj;
      let region = document.getElementById("region");
      if(countryName != null && zona != null){
        region.innerText = countryName +": "+zona;
      }else{
        region.innerText = "territorio desconocido";
      }
      

      crearRelojAnalogico();
      crearRelojDigital();

    } else {
      console.error("Error en la obtencion del timeZone:", data.message);
      getTimezoneAlter(lat, lng);
      /* alert("Para el carro, dale un momento para respirar") */
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
   

  }

}

async function getTimezoneAlter(lat, lng) {
  let url = `https://api.geotimezone.com/public/timezone?latitude=${lat}&longitude=${lng}`;
  
  try {
    fetch('https://cors-anywhere.herokuapp.com/'+url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const formattedDateString = data['current_local_datetime'].formatted.replace(" ", "T"); // Reemplazamos el espacio por "T"
        time = new Date(formattedDateString);
  
        //cambiar a partir de aqui
        //hora minutos y segundos son el tiempo local en españa
  
        // recoger la zona horaria;
        let zona = data.regionName;
        countryName = data.countryName;
        let huso = data.gmtOffset;
        /* alert(zona); */
  
        let ahora = new Date(Date.now());
        let gmtPropio = 3600;
        hora = Math.floor(ahora.getHours() - (gmtPropio / 3600) + (huso / 3600)); // es hora en utc 0
        if (hora >= 24) {
          hora -= 24;
        }
        minutos = ahora.getMinutes() + (huso % 3600 / 60); // modificar para los utc fraccionales
        segundos = ahora.getSeconds();
  
  
        fecha = time;
  
        manecillas[0].angulo = hora * manecillas[0].paso;
        manecillas[1].angulo = minutos * manecillas[1].paso;
        manecillas[2].angulo = segundos * manecillas[2].paso;
  
        console.log(hora + ":" + minutos);
        //llamar a crearse el reloj;
        let region = document.getElementById("region");
        if(countryName != null && zona != null){
          region.innerText = countryName +": "+zona;
        }else{
          region.innerText = "territorio desconocido";
        }
        
  
        crearRelojAnalogico();
        crearRelojDigital();
  
      })
    
    /* const response = await fetch('https://cors-anywhere.herokuapp.com/'+url);
    data = await response.json(); // de aqui puedo sacar el region name para el nombre de la hubicacion */
    
  } catch (error) {
    console.error("Error en la solicitud:", error);
   

  }

}

getTimezone(lat, lng);


