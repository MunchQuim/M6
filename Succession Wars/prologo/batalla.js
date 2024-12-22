let alturaMedia = 200;
let anchoMedio = 500;
let tamañoMedio = 75;
let fontSizeMedia = 8;
let ejercitoR = document.getElementById('ejercitoR');
let ejercitoP = document.getElementById('ejercitoP');
let fondo = document.getElementById('fondo');
let iniciadoPelea = false;

let datacardP = document.getElementById('datacardP');
let datacardR = document.getElementById('datacardR');

let longitudPInit = ejercito.length;
let longitudRInit = ejercitoRival.length;

let partido = true;
/* console.log(ejercitoRival);
console.log(ejercito); */

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
let batallaEnCurso = false;
let porcentajeObjetivo = 100;
async function batalla() {
    if (batallaEnCurso) { return };
    batallaEnCurso = true;
    let ejPnum = ejercito.length;
    let ejRnum = ejercitoRival.length;
    let suma = ejPnum + ejRnum;

    let porcentajeEjercito = (ejPnum / longitudPInit) * 100;
    let porcentajeEjercitoRival = (ejRnum / longitudRInit) * 100;

    if (porcentajeEjercito <= porcentajeObjetivo || porcentajeEjercitoRival <= porcentajeObjetivo) {

        if (porcentajeObjetivo == 100) {
            await fase1();
            porcentajeObjetivo = 66;
        }
        else if (porcentajeObjetivo == 66) {
            await fase2();
            porcentajeObjetivo = 33;
        }
        else if (porcentajeObjetivo == 33) {
            await fase3();
            porcentajeObjetivo = 0;
        }
        else if (porcentajeObjetivo == 0) {
            final();
        }

    }

    //suma son los ataques totales que va a haber
    if (ejPnum * ejRnum != 0) {
        for (let index = 0; index < suma; index++) {
            //primero ataca el jugador y luego la maquina
            if (ejPnum > 0 && ejercitoRival.length > 0 && ejercito.length > 0 && (ejercitoRival.length / longitudRInit) * 100 >= porcentajeObjetivo) {
                /* console.log((ejercitoRival.length/longitudRInit)*100>=porcentajeObjetivo); */
                let indice = Math.floor(Math.random() * ejercito.length);
                ejercito[indice].combate(ejercitoRival);
                ejPnum--
            }
            await esperar(5);
            if (ejRnum > 0 && ejercito.length > 0 && ejercitoRival.length > 0 && (ejercito.length / longitudPInit) * 100 >= porcentajeObjetivo) {
                let indice = Math.floor(Math.random() * ejercitoRival.length);
                ejercitoRival[indice].combate(ejercito);
                ejRnum--
            }//aunque muera peña, seguiran haciendo los mismos ataques que les correspondrian.
            await esperar(5);
        }

    } else {

    } batallaEnCurso = false;


    if (partido) {

        requestAnimationFrame(batalla);
    }
}

async function fase1() {
    await ejecutarAccion(0);
    if (acciones[0]) {
        document.getElementById('dP1').style.backgroundImage = `url(../img/cartas/${eminenciasFases[0]['imagen']})`;
    } if (accionesRivales[0]) {
        document.getElementById('dR1').style.backgroundImage = `url(../img/cartas/${eminenciasFasesRival[0]['imagen']})`;
    }
    /*     console.log(acciones);
        console.log(accionesRivales); */

    await esperar(5000);
}
async function fase2() {
    ejecutarAccion(1);
    if (acciones[1]) {
        document.getElementById('dP2').style.backgroundImage = `url(../img/cartas/${eminenciasFases[1]['imagen']})`;
    } if (accionesRivales[1]) {
        document.getElementById('dR2').style.backgroundImage = `url(../img/cartas/${eminenciasFasesRival[1]['imagen']})`;
    }
    await esperar(5000);
}
async function fase3() {
    ejecutarAccion(2);
    if (acciones[2]) {
        document.getElementById('dP3').style.backgroundImage = `url(../img/cartas/${eminenciasFases[2]['imagen']})`;
    } if (accionesRivales[2]) {
        document.getElementById('dR3').style.backgroundImage = `url(../img/cartas/${eminenciasFasesRival[2]['imagen']})`;
    }
    await esperar(5000);
}
function final() {
    console.log(ejercito.length);
    console.log(ejercitoRival.length);
    console.log(sessionStorage);
    if(ejercito.length>0){
        sessionStorage.setItem("victoria", true);
    }else{
        sessionStorage.setItem("victoria", false);
    }
        window.location.href = 'final.html';
}
async function ejecutarAccion(fase) {
    for (let index = 0; index < 15; index++) {
        if (acciones[fase] && acciones[fase]['prioridad'] == index) {
            console.log(acciones[fase]);
            acciones[fase].accion();
        }
        if (accionesRivales[fase] && accionesRivales[fase]['prioridad'] == index) {
            accionesRivales[fase].accion();
            console.log(accionesRivales[fase]);
        }

    }
}
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
actualizarNumTropas();
mover();
