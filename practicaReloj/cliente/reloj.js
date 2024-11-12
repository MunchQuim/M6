let hora = 0;
let minutos = 0;
let segundos = 0;

let miFecha; // fecha en formato escrito en el reloj digital
let modoFecha = 0; // cambia la fecha entre los 3 formatos

if(sessionStorage.getItem("fechaFormato") === null){
    modoFecha = 0;
}else{
    modoFecha = sessionStorage.getItem("fechaFormato");
}
let manH = {
    angulo: 0,
    largo: 40,
    ancho: 5,
    color: "black",
    paso: 30
};
let manM = {
    angulo: 0,
    largo: 60,
    ancho: 4,
    color: "black",
    paso: 6
};
let manS = {
    angulo: 0,
    largo: 80,
    ancho: 2,
    color: "red",
    paso: 6
};

let fecha; //fecha que devuelve la api.
let modo; // cambia entre 12h-24h
if(sessionStorage.getItem("modo") === null){
    modo = true;
}else{
    modo = sessionStorage.getItem("modo")==='true';
}


let manecillas = [manH, manM, manS];

let momento;

function crearRelojAnalogico() {
    let clockContainer = document.getElementById("clockContainer");
    let analogCanvas = document.getElementById("analogCanvas");
    if (!analogCanvas) {
        analogCanvas = document.createElement("canvas");
        analogCanvas.width = 200;
        analogCanvas.height = 200;
        analogCanvas.id = "analogCanvas";
        clockContainer.appendChild(analogCanvas);
        analogCanvas = document.getElementById("analogCanvas");
    }



    let fondoReloj = "./imgs/analogClock.png";
    pintarCanvas(analogCanvas, fondoReloj);

}
function crearRelojDigital() {
    let clockContainer = document.getElementById("clockContainer");
    let digitalClock = document.getElementById("digitalClock");
    if (digitalClock) {
        digitalClock.remove();
    }
    digitalClock = document.createElement("div");
    digitalClock.id = "digitalClock";

    // creamos un elemento donde poner los datos
    let infoContainer = document.createElement("div");
    infoContainer.id = "infoContainer";
    // un container para horas y minutos 
    /**/let horasMinutosContainer = document.createElement("div");
    /**/horasMinutosContainer.id = "horasMinutosContainer";

    //creamos un container para las horas
    /******/let horasContainer = document.createElement("div");
    /******/horasContainer.id = "horasContainer";
    /******/horasContainer.innerHTML = "<div id='horaD'></div> <div id = 'horaU' ></div>";

    //y otro para los minutos
    /******/let minutosContainer = document.createElement("div");
    /******/minutosContainer.id = "minutosContainer";
    /******/minutosContainer.innerHTML = "<div id='minutoD'></div> <div id = 'minutoU' ></div>";

    //y otro para los minutos
    /******/let segundosContainer = document.createElement("div");
    /******/segundosContainer.id = "segundosContainer";
    /******/segundosContainer.innerHTML = "<div id='segundoD'></div> <div id = 'segundoU' ></div>";

    /**/horasMinutosContainer.appendChild(horasContainer);
    /**/horasMinutosContainer.appendChild(minutosContainer);
    /**/horasMinutosContainer.appendChild(segundosContainer);
    infoContainer.appendChild(horasMinutosContainer);
    //y otro donde poner la fecha
    /**/let fechaContainer = document.createElement("div");
    /**/fechaContainer.id = "fechaContainer";
    /******/ let pmam = document.createElement('div');
    /******/pmam.id = "pmam";
    if (modo) {
        pmam.style.visibility = "hidden";

    } else {
        pmam.style.visibility = "visible";
    }
    fechaContainer.appendChild(pmam);

    /******/ let fecha = document.createElement('div');
    /******/fecha.id = "fecha";
    fechaContainer.appendChild(fecha);

    infoContainer.appendChild(fechaContainer);
    digitalClock.appendChild(infoContainer);
    // y creamos un elemento donde pondremos el boton para pasar entre 12-24h
    let clockBtnContainer = document.createElement("div");
    clockBtnContainer.id = "clockBtnContainer";
    let clockBtnModo = document.createElement("button");

    clockBtnModo.id = "clockBtnModo";
    if (modo) {
        clockBtnModo.innerText = "24H";

    } else {
        clockBtnModo.innerText = "12H";
    }

    clockBtnModo.addEventListener("click", () => {
        modo = !modo;
        sessionStorage.setItem("modo", modo);
        if (modo) {
            clockBtnModo.innerText = "24H";
            document.getElementById("pmam").style.visibility = "hidden";
        } else {
            clockBtnModo.innerText = "12H";
            document.getElementById("pmam").style.visibility = "visible";
        }
        actualizarRelojDigital();
    }, false);



    //le daremos el boton al modo de fecha

    let clockBtnFecha = document.createElement("button");
    clockBtnFecha.id = "clockBtnFecha";
    clockBtnFecha.innerText = "formato";
    if (modoFecha == 0) {
        miFecha = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
    } else if (modoFecha == 1) {
        miFecha = time.toLocaleDateString("es-ES", { weekday: 'long' }) + " " + time.getDate() + " de " + time.toLocaleDateString("es-ES", { month: 'long', year: 'numeric' });
    } else {
        modoFecha = -1;
        miFecha = time.toLocaleDateString("es-ES", { weekday: 'short' }) + " " + time.getDate() + " de " + time.toLocaleDateString("es-ES", { month: 'short' }) + " del " + time.getFullYear().toString().substr(-2)
    }

    clockBtnFecha.addEventListener("click", () => {
        modoFecha++;
        if (modoFecha == 3){
            modoFecha = 0;
        }
        sessionStorage.setItem("fechaFormato", modoFecha);
        if (modoFecha == 0) {
            miFecha = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
        } else if (modoFecha == 1) {
            miFecha = time.toLocaleDateString("es-ES", { weekday: 'long' }) + " " + time.getDate() + " de " + time.toLocaleDateString("es-ES", { month: 'long', year: 'numeric' });
        } else {
            miFecha = time.toLocaleDateString("es-ES", { weekday: 'short' }) + " " + time.getDate() + " de " + time.toLocaleDateString("es-ES", { month: 'short' }) + " del " + time.getFullYear().toString().substr(-2)
        }
        
        
        actualizarRelojDigital();
    }, false);
    clockBtnContainer.appendChild(clockBtnModo);
    clockBtnContainer.appendChild(clockBtnFecha);

    digitalClock.appendChild(clockBtnContainer);
    clockContainer.appendChild(digitalClock);


    actualizarRelojDigital();

}
function actualizarRelojDigital() {
    if (hora >= 12) {
        document.getElementById("pmam").innerText = "PM";
    } else {
        document.getElementById("pmam").innerText = "AM";
    }

    let horaD;
    let horaU;
    if (modo) {
        horaD = Math.floor(hora / 10);
        horaU = hora % 10;
    } else {
        horaD = Math.floor(hora % 12 / 10);
        horaU = hora % 12 % 10;
    }
    let minuD = Math.floor(minutos / 10);
    let minuU = minutos % 10;

    let secD = Math.floor(segundos / 10);
    let secU = segundos % 10;

    //actualizamos la hora del reloj digital;
    document.getElementById("horaD").style.backgroundImage = `url('./imgs/${horaD}.png')`;
    document.getElementById("horaU").style.backgroundImage = `url('./imgs/${horaU}.png')`;
    document.getElementById("minutoD").style.backgroundImage = `url('./imgs/${minuD}.png')`;
    document.getElementById("minutoU").style.backgroundImage = `url('./imgs/${minuU}.png')`;
    document.getElementById("segundoD").style.backgroundImage = `url('./imgs/${secD}.png')`;
    document.getElementById("segundoU").style.backgroundImage = `url('./imgs/${secU}.png')`;

    // imprime la fecha en el reloj digital
    document.getElementById("fecha").innerText = miFecha;
}

function pintarCanvas(canvas, fondo) {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    let ctx = canvas.getContext("2d");
    let imagen = new Image();// creo un objeto imagen
    imagen.src = fondo;//para poder imprimir el png

    momento = Date.now();

    function dibujarReloj() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight); //lo limpiamos
        ctx.drawImage(imagen, 0, 0, 200, 200);
        manecillas.forEach(manecilla => {
            let anguloAjustado = (manecilla.angulo - 90) * (Math.PI / 180) // le restamos 90 grados para que apunte hacia arriba y convertimos a radianes
            //la imprimimos
            let destinoX = centroX + Math.cos(anguloAjustado) * manecilla.largo;
            let destinoY = centroY + Math.sin(anguloAjustado) * manecilla.largo;

            ctx.beginPath();
            ctx.moveTo(centroX, centroY); // Mueve el cursor al centro // lo dibuja desde el centro 
            ctx.lineTo(destinoX, destinoY); // Dibuja la línea hacia el borde // hacia el destino
            ctx.lineWidth = manecilla.ancho; // Grosor de la línea
            ctx.strokeStyle = manecilla.color; // Cambia el color del trazo
            ctx.stroke();
        });

    };

    function actualizarManecillas() {
        let ahora = Date.now(); // se pueden sumar milisegundos para ser mas precisos

        if (ahora - momento >= 1000) {
            //actualizamos los segundos
            segundos += 1;
            if (segundos >= 60) {
                segundos = segundos - 60; // podria pasarlo a 0 pero por si las moscas
                minutos += 1;
                if (minutos == 60) {
                    minutos = 0;
                    hora += 1;
                    if (hora == 24) {
                        hora = 0;
                        /// continuar si se requiere cambiar de fecha
                        getTimezone(lat, lng); // forma vaga, volver a hacer la peticion;
                    }
                }
            }
            actualizarRelojDigital();
            // actualizamos el angulo de las manecillas 
            manecillas[0].angulo = hora * manecillas[0].paso;
            manecillas[1].angulo = minutos * manecillas[1].paso;
            manecillas[2].angulo = segundos * manecillas[2].paso;
            /* console.log(hora + ":" + minutos + ":" + segundos); */
            // por lo tanto el angulo es brusco, pero por ahora me vale

            momento += 1000; // lo actualizo a un segundo despues para que en caso de haber desincronia de  menos de 2 segundos
        }

    }
    function actualizarReloj() {
        actualizarManecillas();
        dibujarReloj();
        requestAnimationFrame(actualizarReloj); // Llamada recursiva controlada
    }

    // Iniciar cuando la imagen esté cargada
    imagen.onload = function () {
        actualizarReloj(); // Iniciar la animación
    };


}

