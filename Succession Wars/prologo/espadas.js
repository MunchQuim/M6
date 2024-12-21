let continuar = document.getElementById('iniciar');

continuar.addEventListener('click',()=>{
window.location.href = 'seleccion.html';
},false);
let espadas = document.querySelectorAll('.sword');

function moverEspadas(){
    setTimeout(()=>{
        espadas.forEach(espada => {
            espada.classList.remove('hidden');
            if(espada.classList.contains('reverse')){
                espada.classList.add('moverCentroRev');
            }else{
                espada.classList.add('moverCentro');
            }
        });
    },1000);
    

}
moverEspadas();