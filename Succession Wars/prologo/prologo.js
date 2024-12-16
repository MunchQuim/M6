let pantallaY = document.getElementById('screen').offsetHeight;
let pantallaX = document.getElementById('screen').offsetWidth;

function colocacionInicial() {
    crearObjeto('screen', 'pouch', '../img/pouch.png', 214, 300, 0, pantallaY - 300)
    let pouch = document.getElementById('pouch');

    crearObjeto('pouch', 'poison', '../img/poison.png', 40, 40, -pouch.offsetLeft + pouch.offsetWidth / 2 - 20, pouch.offsetHeight * 3 / 4 - pouch.offsetTop);

    crearObjeto('screen', 'bandeja', '../img/bandeja.png', 500, 200, 0 + screen.width, 400);
    crearObjeto('screen', 'copa', '../img/vino.png', 259 / 4, 963 / 4, 0 + 185 + screen.width, 400 - 185);

    crearObjeto('screen', 'rey', '../img/rey.png', 300, 300, 0 - 300, 0+300);

    let copa = document.getElementById('copa');

    // hacemos un observer // repasar los apuntes del observer

    const observer = new MutationObserver((mutationList,observer)=>{
        mutationList.forEach(mutation => {
            if (mutation.type === 'childList'){
                mutation.addedNodes.forEach(node => {
                    if (node === document.getElementById('poison')){
                        document.getElementById('copa').style.backgroundImage = 'url(../img/VinoVeneno.png)';
                        document.getElementById('poison').remove();
                        salida();
                    }
                  });
            }
            
        });
    });
    const config = { childList: true };

    observer.observe(copa,config);
}
colocacionInicial();

let pantalla = document.getElementById('screen');
let bandeja = document.getElementById('bandeja');
function entrada() {
    moverObjeto('bandeja', pantalla.offsetWidth / 2 - bandeja.offsetWidth/2, pantalla.offsetHeight / 2, 2000);
    moverObjeto('copa', pantalla.offsetWidth / 2 + 185- bandeja.offsetWidth/2, pantalla.offsetHeight / 2 - 185, 2000);
    document.getElementById('poison').classList.add('draggable');
}
function titulo() {
    window.location.href = 'menu.html';
}
function salida() {
    let rey = document.getElementById('rey');
    moverObjeto('bandeja', -500, pantalla.offsetHeight / 2, 20);
    moverObjeto('copa', -500+185, pantalla.offsetHeight / 2 - 185, 20);
    
    setTimeout(()=>{
        girarObjeto('rey',90,1000);
        moverObjeto('rey',rey.offsetLeft+300,rey.offsetTop+50/* +rey.offsetWidth/2 */,300);
    },2000);
    setTimeout(()=>{
        titulo();
    },5000)
   
}
entrada();



