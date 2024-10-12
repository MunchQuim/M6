
let nombre;
let ronda = 0;
let rondaMax = 0;
//recoger datos del quiz
let listadoQuiz = [];
let listadoPostQuiz = [];
let listadoDivQuiz = [];
let correctas = 0;
let incorrectas = 0;
async function prepararPreguntas() {
    let response = await fetch("https://the-trivia-api.com/api/questions?limit=10&categories=general_knowledge");
    listadoQuiz = await response.json();
    console.log(listadoQuiz);
    let contadorPreguntas = 0;
    let contadorRondas = 0;
    listadoQuiz.forEach(element => {

        let containerQuestion = document.createElement('div');
        containerQuestion.id = "ContainerQuestion" + contadorRondas;

        let question = document.createElement('h1');
        question.id = "question" + contadorPreguntas;
        question.innerText = element['question'];

        let inputs = document.createElement('div');
        inputs.id = "containerInputs";

        let respuestas = [];
        element['incorrectAnswers'].forEach(incorrectAnswer => {
            let posicion = element['incorrectAnswers'].indexOf(incorrectAnswer);

            let cajaRespuesta = document.createElement('div');

            let respuesta = document.createElement('input');
            respuesta.type = "radio";
            respuesta.name = element['id'];
            respuesta.id = "radio" + contadorPreguntas + posicion;

            let respuestaTexto = document.createElement('span');
            respuestaTexto.innerText = incorrectAnswer;

            cajaRespuesta.appendChild(respuesta);
            cajaRespuesta.appendChild(respuestaTexto);

            respuestas.push(cajaRespuesta);
        });

        let cajaRespuesta = document.createElement('div');

        let respuesta = document.createElement('input');
        respuesta.type = "radio";
        respuesta.name = element['id'];
        respuesta.id = "radio" + contadorPreguntas + 4;

        let respuestaTexto = document.createElement('span');
        respuestaTexto.innerText = element['correctAnswer'];

        cajaRespuesta.appendChild(respuesta);
        cajaRespuesta.appendChild(respuestaTexto);

        respuestas.push(cajaRespuesta);
        respuestas.sort;

        respuestas.forEach(respuesta => {
            inputs.appendChild(respuesta);
        });
        containerQuestion.appendChild(question);
        containerQuestion.appendChild(inputs);

        listadoDivQuiz.push(containerQuestion);

        contadorPreguntas += 1;
        if (contadorPreguntas % 2 == 0) {
            contadorRondas += 1;
        }
    });
    rondaMax = contadorRondas - 1;

    for (let index = 0; index < listadoDivQuiz.length; index += 2) {
        let containerRonda = document.createElement("div");
        containerRonda.className = "ronda " + "ronda" + (index / 2);
        if (index > 0) {
            containerRonda.style.display = "none";
        }
        containerRonda.appendChild(listadoDivQuiz[index]);
        containerRonda.appendChild(listadoDivQuiz[index + 1]);
        document.getElementById("containerQuiz").appendChild(containerRonda);
    }
    /*     for (let index = 1; index < rondaMax; index++) {
            let containersQuestion = document.querySelectorAll("#ContainerQuestion" + index);
            containersQuestion.forEach(element => {
                element.style.display = "none";
            });
        } */

    return listadoQuiz;

}
/* listadoPostQuiz = prepararPreguntas(); */
prepararPreguntas();

document.getElementById("btnName").addEventListener("click", guardarNombre, false);
function guardarNombre() {
    if (document.getElementById("fname").value.length > 0) {
        nombre = document.getElementById("fname").value;
        document.getElementById("containerName").style.display = "none";
        document.getElementById("containerQuiz").style.display = "flex";
        document.getElementById("corregir").style.display = "flex";
    }
}

document.getElementById("corregir").addEventListener("click", corregir, false);

function corregir() {
    //mire si he acertado las preguntas de la ronda actual
    let radioNameArray = document.querySelectorAll('input[type="radio"]:checked:not([disabled])');
    radioNameArray.forEach(radio => {

        let radioName = radio.name;
        listadoQuiz.forEach(element => {
            if (element['id'] == radioName) {
                // me cambie el color segun acierte o no
                if (radio.nextElementSibling.textContent == element['correctAnswer']) {
                    radio.nextElementSibling.style.color = "green";
                    correctas += 1;
                } else {
                    radio.nextElementSibling.style.color = "red";
                    incorrectas -= 1;
                }
            }
        });
        //me bloquee los botones de la ronda actual
        document.getElementsByName(radioName).forEach(element => {
            element.disabled = true;
        });
    });
    if (correctas % 2 == 0 && correctas > 0) {
        pasarRonda();
    }
    else {
        perder();
    }


    //si he acertado todas paso de ronda, si no pierdo
}
function pasarRonda() {

    ronda += 1;
    console.log("pasando a ronda " + ronda + " de " + rondaMax);
    if (ronda <= rondaMax) {
        document.querySelectorAll('.ronda' + ronda)[0].style.display = "flex";
    } else {
        ganar();
    }

}


function perder() {

    document.getElementById("gameOver").style.display = "block";
    guardarDatos(nombre, correctas, false);
}

function ganar() {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("congratulations").style.display = "block"; ç
    guardarDatos(nombre, correctas, true);
}

// Función para guardar datos en el archivo JSON
function guardarDatos(pNombre, pCorrectas, pGanado) {
    let nuevoDato = {
        nombre: pNombre,
        correctas: pCorrectas,
        haGanado: pGanado
    };
}