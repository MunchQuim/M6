//Some howler variables
let songVolume = 0.5;
let howler;


//Equalizer
//Get the audio context for the analyzer and get the number of samples
let analyser;
let bufferLength;
let dataArray;

//Get the canvas and the context to use the equalizer
let canvas = document.getElementById('equalizer');
let ctx = canvas.getContext('2d');

async function enseñarCanciones() {

    let response = await fetch('./jsons/songsData.json');
    songs = await response.json();
    let songList = document.getElementById("songList");

    songs.forEach(song => {
        let songDiv = document.createElement("div");
        songDiv.innerText = song["title"];
        songDiv.addEventListener("click", () => {
            ponerFoto(song["image"]);
            loadSongs(song["src"],song["image"]);
            howler.play();
            
        }, false)
        songList.appendChild(songDiv);
    });
}
//Loading Songs
const loadSongs = async (pSrc,image) => {
    Howler.unload();// lo destruimos (no podemos usar howler sino Howler) para que no se vayan sumando instancias
    howler = new Howl({
        src: pSrc,
        volume: songVolume
    });


    //Falta el tratamiento de las propiedades de la canción y toda la creación de la radio. Falta la creación y gestión de la lista de reproducción

    //Equilizer
    let color = await getColor(image);
    analyser = Howler.ctx.createAnalyser();    //Proporciona acceso a la frecuencia y los datos de tiempo del audio que está siendo reproducido. 
    bufferLength = analyser.frequencyBinCount; //Indica el número de muestras de datos que se obtendrán del audio.
    dataArray = new Uint8Array(bufferLength);
    loadEqualizer();
    animateEqualizer(color);
}





function loadEqualizer() {
    // Conexion del masterGain (el volumen maestro de Howler.js) con el analyzer, permitiendo que el ecualizador recoja datos del audio que se está reproduciendo.
    Howler.masterGain.connect(analyser);

    // Conecta analyzer en el destino de audio. El audio sigue reproduciéndose en los altavoces o auriculares mientras se analiza
    analyser.connect(Howler.ctx.destination);

    // Coloca la frecuencia de muestreo. Obtiene un equilibrio entre la resolución temporal y la precisión de la frecuencia.
    analyser.fftSize = 2048;

    // Se utiliza para obtener los datos de forma de onda del audio en tiempo real, lo que se conoce como datos de dominio temporal. Devuelve la representación de la señal de audio en el dominio del tiempo, es decir, cómo varía la amplitud del sonido a lo largo del tiempo.
    analyser.getByteTimeDomainData(dataArray);
}

/* 
function animateEqualizer() {

    // Limpia el lienzo del canvas para pintar de nuevo
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.height);

    // Obtiene los datos de frecuencia del audio. Cada valor del arreglo representa la amplitud de una frecuencia específica del espectro de audio, que luego se usa para dibujar las barras.
    analyser.getByteFrequencyData(dataArray);
    console.log(bufferLength)
    // Dibuja las barras del ecualizador
    let barSpacing = 0; // Espaciado entre barras
    let barWidth = (canvas.offsetWidth/bufferLength); // Calcula el ancho de cada barra
    let barHeight;
    // Recorre el array de datos de frecuencia y dibuja las barras
    const maxBarHeight = canvas.offsetHeight; // Altura máxima deseada

    for (let i = 0; i < bufferLength; i++) {
        console.log(dataArray[i]);
        // Normalizar y escalar el valor
        barHeight = (dataArray[i] / 1000) * maxBarHeight; // Asumiendo que dataArray tiene valores entre 0 y 255
        let x = i * (barWidth + barSpacing);
        let y = canvas.height - barHeight;
    
        ctx.fillStyle = 'blue'; // Cambia el color de las barras según tu preferencia
        // Pinta la barra actual
        ctx.fillRect(x, y, barWidth, barHeight);
    }
    // Repite la animación
    animationFrame = requestAnimationFrame(animateEqualizer);
} */

function animateEqualizer(color) {
    // Limpia el lienzo del canvas para pintar de nuevo
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.height);

    // Obtiene los datos de frecuencia del audio
    analyser.getByteFrequencyData(dataArray);

    const maxBarHeight = canvas.offsetHeight * 0.3; // Altura máxima deseada
    const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.25; // Radio del círculo
    const centerX = canvas.offsetWidth / 2; // Centro del canvas
    const centerY = canvas.offsetHeight / 2; // Centro del canvas

    // Recorre el array de datos de frecuencia y dibuja las líneas radiales
    for (let i = 0; i < bufferLength * 0.5; i++) {// adaptado ya que nos e muestran todsa las frecuencias
        // Normalizar y escalar el valor
        const barHeight = (dataArray[i] / 255) * maxBarHeight; // Normaliza el valor entre 0 y maxBarHeight
        const angle = (i / (bufferLength * 0.5)) * (Math.PI * 2) - (Math.PI / 2); // Calcula el ángulo correspondiente// adaptado ya que nos e muestran todsa las frecuencias de debe multiplicar por 1/ lo reducido
        const x = centerX + Math.cos(angle) * (radius + barHeight); // Coordenada x
        const y = centerY + Math.sin(angle) * (radius + barHeight); // Coordenada y

        ctx.fillStyle = color; // Cambia el color de las barras según tu preferencia
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Mueve el cursor al centro
        ctx.lineTo(x, y); // Dibuja la línea hacia el borde
        ctx.lineWidth = 2; // Grosor de la línea
        ctx.strokeStyle = color; // Cambia el color del trazo
        ctx.stroke(); // Dibuja la línea
    }

    // Repite la animación
    animationFrame = requestAnimationFrame(animateEqualizer);
}



function playSong(track) {
    console.log(track);
}
function ponerFoto(image) {
    let canvasContainer = document.getElementById("imgContainer");
    let imagen = document.getElementById("imagen");//si existe una imagen previa
    if (imagen) {
        imagen.remove();//la borramos
    }

    imagen = document.createElement('img');// y creamos la nueva
    imagen.id = "imagen";
    imagen.src = image;

    canvasContainer.appendChild(imagen);
}

function getColor(src) {//chat gpt 
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Necesario para imágenes cargadas desde dominios diferentes
        img.src = src;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r = 0, g = 0, b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            const pixelCount = data.length / 4;
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);

            resolve(`rgb(${r}, ${g}, ${b})`);
        };
        img.onerror = function() {
            reject(new Error('No se pudo cargar la imagen.'));
        };
    });
}
enseñarCanciones();
// On Load
/* loadSongs(); */

