document.getElementById("ej1").addEventListener("click", function () {
    resaltar("ejercicio1");
}, false);
document.getElementById("ej2").addEventListener("click", function () {
    resaltar("ejercicio2");
}, false);
document.getElementById("ej3").addEventListener("click", function () {
    resaltar("ejercicio3");
}, false);
document.getElementById("ej4").addEventListener("click", function () {
    resaltar("ejercicio4");
}, false);
document.getElementById("ej5").addEventListener("click", function () {
    resaltar("ejercicio5");
}, false);
document.getElementById("ej6").addEventListener("click", function () {
    resaltar("ejercicio6");
}, false);
document.getElementById("ej7").addEventListener("click", function () {
    resaltar("ejercicio7");
}, false);


function resaltar(param) {
    let ejercicios = document.getElementsByClassName("ejercicio");
    for (let index = 0; index < ejercicios.length; index++) {

        ejercicios[index].style.visibility = "hidden";
        ejercicios[index].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    document.getElementById(param).style.visibility = "visible";
    document.getElementById(param).style.backgroundColor = "rgba(0, 0, 0, 0.897)";

}




// ejercicio 1//

function compararTexto() {
    let cuadro1 = document.getElementById("ej_1_in_1").value;
    let cuadro2 = document.getElementById("ej_1_in_2").value;
    const simbolo = document.getElementById("ejercicio1_simbolo");
    if (cuadro1 === cuadro2) {
        simbolo.innerHTML = "=";
    } else {
        simbolo.innerHTML = "!=";
    }
}
document.getElementById("ej_1_in_1").addEventListener("keyup", compararTexto, false);
document.getElementById("ej_1_in_2").addEventListener("keyup", compararTexto, false);
///////////////////////////////////////////////////////////

// ejercicio 2//

function contarLetras() {
    let texto = this.value;
    let cuenta = 0;


    for (let index = 0; index < texto.length; index++) {

        if (/^([a-zA-Z])$/.test(texto[index])) { /* \s para espacios */
            cuenta++;
        }
    }

    document.getElementById("ej_2_num").innerHTML = cuenta;
}
document.getElementById("ej_2_in_1").addEventListener("keyup", contarLetras, false);

//////////////////////////////////////////////

// ejercicio 3 //
document.getElementById("ej_3_in_1").addEventListener("keyup", raizCuadrada, false)
function raizCuadrada() {
    let num = Number(this.value);
    if (typeof num === 'number') {

        let raiz = Math.pow(num, 1 / 2).toFixed(2);
        document.getElementById("ej_3_res").innerHTML = raiz;
    }
    else {
        document.getElementById("ej_3_res").innerHTML = "";
    }
}
//////////////////////////////////////////////

// ejercicio 4 //

document.getElementById("ej_4_in_1").addEventListener("keyup", concatenaTexto, false);
document.getElementById("ej_4_in_2").addEventListener("keyup", concatenaTexto, false);

function concatenaTexto() {
    let texto1 = document.getElementById("ej_4_in_1").value;
    let texto2 = document.getElementById("ej_4_in_2").value;
    let texto3 = texto1 + texto2;
    document.getElementById("ej_4_res").innerHTML = texto3;
}
//////////////////////////////////////////////

// ejercicio 5 //
document.getElementById("ej_5_in_1").addEventListener("change", cambiaColor, false);
document.getElementById("ej_5_in_2").addEventListener("change", cambiaColor, false);
document.getElementById("ej_5_in_3").addEventListener("change", cambiaColor, false);
function cambiaColor() {
    let azul = "#0000ff";
    let verde = "#008000";
    let rojo = "#ff0000";
    let color;
    document.getElementById("ej_5_in_1").checked = false;
    document.getElementById("ej_5_in_2").checked = false;
    document.getElementById("ej_5_in_3").checked = false;
    this.checked = true;
    if (document.getElementById("ej_5_in_1").checked) {
        color = verde;
    }
    else if (document.getElementById("ej_5_in_2").checked) {
        color = azul;
    }
    else {
        color = rojo;
    }
    document.getElementsByTagName("footer")[0].style.backgroundColor = color;
    document.getElementsByTagName("header")[0].style.backgroundColor = color;
}
//////////////////////////////////////////////

// ejercicio 6 //
let altura = document.getElementById("ej_6_img").offsetHeight; // altura original
let ancho = document.getElementById("ej_6_img").offsetWidth; // ancho original
const max = document.getElementById("cont_6").offsetHeight;
const min = 25;

document.getElementById("ej_6_in_1").value = altura;
document.getElementById("ej_6_in_2").value = ancho;

document.getElementById("ej_6_in_1").addEventListener("change", cambiarTamano, false)
document.getElementById("ej_6_in_2").addEventListener("change", cambiarTamano, false)

function cambiarTamano() {
    let multiplicador;
    if (document.getElementById("ej_6_in_1").value != altura) {
        // ha cambiado la altura
        console.log("modificando altura");
        multiplicador = (document.getElementById("ej_6_in_1").value / altura);// cuanto ha cambiado la altura


    } else if (document.getElementById("ej_6_in_2").value != ancho) {
        // ha cambiado la achura
        console.log("modificando ancho");
        multiplicador = (document.getElementById("ej_6_in_2").value / ancho);
    }

    if (multiplicador * altura > max) {
        multiplicador = max / altura;
    }
    else if (multiplicador * altura < min) {
        multiplicador = min / altura;
    }
    document.getElementById("ej_6_in_1").value = Math.trunc(altura * multiplicador, 0);
    altura = document.getElementById("ej_6_in_1").value;
    document.getElementById("ej_6_in_2").value = Math.trunc(ancho * multiplicador, 0);
    ancho = document.getElementById("ej_6_in_1").value;

    document.getElementById("ej_6_img").style.height = "" + (document.getElementById("ej_6_in_1").value) + "px";
    document.getElementById("ej_6_img").style.width = "" + (document.getElementById("ej_6_in_2").value) + "px";
}

//////////////////////////////////////////////

// ejercicio 7 //

const palabras = ["Javascript", "Python", "CSharp", "Bootstrap", "Tailwind", "Mockup"];
const random = Math.trunc(Math.random() * palabras.length, 0);
const palabra = palabras[random];
console.log(palabra);

document.getElementById("ej_7_in_1").addEventListener("keyup", checkPalabra, false);
function checkPalabra() {
    let inPalabra = document.getElementById("ej_7_in_1").value;
    let coincidencias = 0;
    let longitud = Math.max(palabra.length, inPalabra.length);

    for (let index = 0; index < longitud; index++) {
        if (inPalabra[index] == palabra[index]) {
            console.log();
            coincidencias++;
        }
    }
    if (coincidencias == longitud) {
        document.getElementById("ej_7_congrats").style.display = "block";
        document.getElementById("ej_7_tip").style.display = "none";
    }
    else {
        if (document.getElementById("ej_7_tip").style.display == "none") {
            document.getElementById("ej_7_congrats").style.display = "none";
            document.getElementById("ej_7_tip").style.display = "block";
        }

        document.getElementById("ej_7_res").innerHTML = coincidencias;
    }

}