let nombre;
let ronda = 0;
let rondaMax = 0;
//recoger datos del quiz
let listadoQuiz = [];
let listadoDivQuiz = [];
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
            respuesta.name = contadorPreguntas + "";
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
        respuesta.name = contadorPreguntas + "";
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
    rondaMax = contadorRondas;

    for (let index = 0; index < listadoDivQuiz.length; index+= 2) {
        let containerRonda = document.createElement("div");
        containerRonda.className = "ronda "+(index/2);
        if(index >0){
            containerRonda.style.display = "none";
        }
        containerRonda.appendChild(listadoDivQuiz[index]);
        containerRonda.appendChild(listadoDivQuiz[index+1]);
        document.getElementById("containerQuiz").appendChild(containerRonda);
    }
/*     for (let index = 1; index < rondaMax; index++) {
        let containersQuestion = document.querySelectorAll("#ContainerQuestion" + index);
        containersQuestion.forEach(element => {
            element.style.display = "none";
        });
    } */

}
prepararPreguntas();




document.getElementById("btnName").addEventListener("click", guardarNombre, false);
function guardarNombre() {
    if (document.getElementById("fname").value.length > 0) {
        nombre = document.getElementById("fname").value;
        document.getElementById("containerName").style.display = "none";
        document.getElementById("containerQuiz").style.display = "flex";
    }
}

