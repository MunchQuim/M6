let nombre;

//recoger datos del quiz
let listadoQuiz;
async function prepararPreguntas() {
    const RESPONSE = await fetch("https://the-trivia-api.com/api/questions?limit=10&categories=general_knowledge");
    listadoQuiz = RESPONSE.json();
}
prepararPreguntas();



document.getElementById("btnName").addEventListener("click",guardarNombre,false);
function guardarNombre() {
    if(document.getElementById("fname").value.length>0){
        nombre = document.getElementById("fname").value;
        document.getElementById("containerName").style.display = "none";
        document.getElementById("containerQuiz").style.display = "flex";
    }    
}