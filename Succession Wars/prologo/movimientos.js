
document.addEventListener('wheel', function (event) {
    if (event.ctrlKey) { // Si el usuario usa Ctrl + rueda del mouse
        event.preventDefault(); // Previene el zoom
    }
}, { passive: false });
document.addEventListener('keydown', function (event) {
    // Detectar si la tecla 'Ctrl' está presionada y si la tecla '+' (107 en el código de tecla) o la tecla de igual (=) es presionada
    if (event.ctrlKey && (event.key === '=' || event.key === '+' || event.key === '-')) {
        event.preventDefault();  // Previene el zoom
    }

    console.log('pulsando tecla');
});

/* function crearObjeto(padre, nombre, url,sizeX ,sizeY, x, y) {
    let objeto = document.createElement('img');
    let divPadre = document.getElementById(padre);

    objeto.classList.add('objeto');
    objeto.id = nombre;
    objeto.src = url;
    if(sizeX != null){
        objeto.style.width = sizeX + "px";
    }
    objeto.style.height = sizeY + 'px';
    console.log(divPadre.offsetWidth);
    objeto.style.left = divPadre.offsetLeft+x + 'px';
    objeto.style.top = divPadre.offsetTop+y + 'px';
    divPadre.appendChild(objeto);
} */
function crearObjeto(padre, nombre, url, sizeX, sizeY, x, y) {
    // Creamos el div
    let objeto = document.createElement('div');

    // Obtenemos el div padre
    let divPadre = document.getElementById(padre);

    // Añadimos la clase 'objeto' y el ID al div
    objeto.classList.add('objeto');
    objeto.id = nombre;

    // Establecemos la imagen de fondo
    objeto.style.backgroundImage = `url(${url})`;

    // Establecemos el tamaño del objeto, si sizeX y sizeY están definidos
    if (sizeX != null) {
        objeto.style.width = sizeX + "px";
    }
    if (sizeY != null) {
        objeto.style.height = sizeY + 'px';
    }

    // Establecemos la posición del objeto, considerando la posición del div padre
    objeto.style.position = 'absolute';  // Aseguramos que el objeto se posicione de forma absoluta
    objeto.style.left = divPadre.offsetLeft + x + 'px';
    objeto.style.top = divPadre.offsetTop + y + 'px';

    // Añadimos el div al contenedor padre
    divPadre.appendChild(objeto);
}
async function moverObjeto(id, x, y, tiempo) {// te lleva a la posicion x,y
    let objeto = document.getElementById(id);
    let initX = objeto.offsetLeft;
    let initY = objeto.offsetTop;

    let saltoX = (x - initX) / ((tiempo/10) * 60); //si estoy en 500 y quiero ir a 0 (deltaX = -500) en 10 segundos (600 ticks) me movere -5/6 px por tick
    let saltoY = (y - initY) / ((tiempo/10) * 60);
    console.log(saltoX);
    let saltoXAcumulado = 0;
    let saltoYAcumulado = 0;
    const actualizarPosicion = () => { //corregir
        let currentLeft = objeto.offsetLeft;
        let currentTop = objeto.offsetTop;
        saltoXAcumulado += saltoX;
        saltoYAcumulado += saltoY;
        if ((saltoX > 0 && (currentLeft + saltoXAcumulado) > x)
            || (saltoX < 0 && (currentLeft + saltoXAcumulado) < x)) {
            objeto.style.left = `${x}px`;
        } else {
            objeto.style.left = `${currentLeft + saltoXAcumulado}px`;
        }
        if ((saltoY > 0 && (currentTop + saltoYAcumulado) > y)
            || (saltoY < 0 && (currentTop + saltoYAcumulado) < y)) {
            objeto.style.top = `${y}px`;
        } else {
            objeto.style.top = `${currentTop + saltoYAcumulado}px`;
        }

        if (objeto.offsetLeft == x && objeto.offsetTop == y) {
            console.log('saliendo');
            return
        }
        requestAnimationFrame(actualizarPosicion);
    }
    requestAnimationFrame(actualizarPosicion);
    /* objeto.style.left = "200px"; */
}
async function girarObjeto(id, deg, tiempo) { // hace girar tantos grados

    let objeto = document.getElementById(id);
    let initDeg = obtenerRotacionPorCadena(objeto);
    let targetDeg = initDeg + deg;
    let makedDeg = 0;
    let saltoDeg = (targetDeg - initDeg) / ((tiempo / 1000) * 60);

    const actualizarRotacion = () => {
        let currentDeg = obtenerRotacionPorCadena(objeto);
        let nextDeg = currentDeg + saltoDeg;
        makedDeg += saltoDeg;
        console.log(targetDeg);
        if ((saltoDeg > 0 && initDeg + makedDeg >= targetDeg) || (saltoDeg < 0 && initDeg + makedDeg <= targetDeg) || currentDeg == targetDeg) {
            objeto.style.transform = `rotate(${targetDeg}deg)`;
            return;
        }

        objeto.style.transform = `rotate(${nextDeg}deg)`;
        requestAnimationFrame(actualizarRotacion);
    };

    requestAnimationFrame(actualizarRotacion);
}

function obtenerRotacionPorCadena(elemento) {
    // Obtener la propiedad 'transform' del elemento
    const transform = window.getComputedStyle(elemento).transform;

    // Si no hay transform aplicado, devolvemos 0 (sin rotación)
    if (transform === 'none') {
        return 0;
    }

    // Para obtener la rotación, necesitamos analizar la matriz de transformación
    const matrix = new DOMMatrix(transform);

    // La rotación está almacenada en la propiedad 'a' (coseno) y 'b' (seno) de la matriz
    const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

    return angle;
}

console.log(obtenerRotacionPorCadena(document.getElementById('screen')));
/* document.addEventListener('keydown', () => {
    
}, false); */
/* crearObjeto("bandeja", '../img/bandeja.png', 200, screen.width - 500, screen.height - 500);
crearObjeto("vino", '../img/vino.png', 300, document.getElementById('bandeja').offsetLeft + 220, document.getElementById('bandeja').offsetTop - 245); */