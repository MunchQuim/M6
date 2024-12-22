let alturaMedia = 200;
let anchoMedio = 500;
let tamañoMedio = 75;
let fontSizeMedia = 8;
let ejercitoR = document.getElementById('ejercitoR');
let ejercitoP = document.getElementById('ejercitoP');
let fondo = document.getElementById('fondo');
let iniciadoPelea = false;

let partido = true;
async function actualizarNumTropas() {
    let R = ejercitoRival.length
    let P = ejercito.length
    document.getElementById('ejercitoRNum').innerText = R;
    document.getElementById('ejercitoPNum').innerText = P;

    document.getElementById('ejercitoR').style.width = ((R * anchoMedio) / tamañoMedio) + "px";
    document.getElementById('ejercitoR').style.height = ((R * alturaMedia) / tamañoMedio) + "px";
    document.getElementById('ejercitoRNum').style.fontSize = ((R * fontSizeMedia) / tamañoMedio) + "em"

    document.getElementById('ejercitoP').style.width = ((P * anchoMedio) / tamañoMedio) + "px";
    document.getElementById('ejercitoP').style.height = ((P * alturaMedia) / tamañoMedio) + "px";
    document.getElementById('ejercitoPNum').style.fontSize = ((P * fontSizeMedia) / tamañoMedio) + "em"
    if (partido) {
        requestAnimationFrame(actualizarNumTropas);
    }

}


async function mover() {
    let objetivoR = (fondo.offsetHeight / 2) - ejercitoR.offsetHeight;
    let objetivoP = fondo.offsetHeight / 2;
    let distancia = 5;
    let RAlcanzado = false;
    let PAlcanzado = false;
    if (ejercitoR.offsetTop < objetivoR - 1) {
        ejercitoR.style.top = (Math.min(ejercitoR.offsetTop + distancia, objetivoR)) + "px";
    } else {
        RAlcanzado = true;
    }
    if (ejercitoP.offsetTop > objetivoP + 1) {
        ejercitoP.style.top = (Math.max(ejercitoP.offsetTop - distancia, objetivoP)) + "px";
    } else {
        PAlcanzado = true;
    }
    if (partido) {        
        if (RAlcanzado && PAlcanzado && !iniciadoPelea) {
            iniciadoPelea = true;
            batalla();
            //llamar a la batalla
        }
        requestAnimationFrame(mover);
    }
}

function batalla() {
    let ejPnum = ejercito.length;
    let ejRnum = ejercitoRival.length;
    let suma = ejPnum+ejRnum;

    //suma son los ataques totales que va a haber
    for (let index = 0; index < suma; index++) {
        //primero ataca el jugador y luego la maquina
        if(ejPnum>0){
            let indice = Math.floor(Math.random() * ejercito.length);
            ejercito[indice].combate(ejercitoRival);
            ejPnum--
        }
        if(ejRnum>0){
            let indice = Math.floor(Math.random() * ejercitoRival.length);
            ejercitoRival[indice].combate(ejercito);
            ejRnum--
        }//aunque muera peña, seguiran haciendo los mismos ataques que les correspondrian.
        
    }
    if (partido) {        
        
        requestAnimationFrame(batalla);
    }
}

actualizarNumTropas();
mover();
