let pantallaY = document.getElementById('screen').offsetHeight;
let pantallaX = document.getElementById('screen').offsetWidth;

function colocacionInicial() {
    crearObjeto('screen', 'pouch', '../img/pouch.png', 214, 300, 0, pantallaY - 300);
    let pouch = document.getElementById('pouch');

    crearObjeto('pouch', 'poison', '../img/poison.png', 40, 40, -pouch.offsetLeft + pouch.offsetWidth / 2 - 20, pouch.offsetHeight * 3 / 4 - pouch.offsetTop);

    crearObjeto('screen', 'bandeja', '../img/bandeja.png', 500, 200, 0 + screen.width, 400);
    crearObjeto('screen', 'copa', '../img/vino.png', 259 / 4, 963 / 4, 0 + 185 + screen.width, 400 - 185);

    crearObjeto('screen', 'rey', '../img/rey.png', 200, 200, 0 - 200, 0 + 300);

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
function entrada() {
    moverObjeto('bandeja', pantalla.offsetWidth / 2, pantalla.offsetHeight / 2, 2000);
    moverObjeto('copa', pantalla.offsetWidth / 2 + 185, pantalla.offsetHeight / 2 - 185, 2000);
    document.getElementById('poison').classList.add('draggable');
}
function salida() {
    let rey = document.getElementById('rey');
    moverObjeto('bandeja', -500, pantalla.offsetHeight / 2, 20);
    moverObjeto('copa', -500+185, pantalla.offsetHeight / 2 - 185, 20);
    girarObjeto('rey',90,1000);
    setTimeout(()=>{
        moverObjeto('rey',rey.offsetLeft+200,rey.offsetTop,300);
    },2000)
   
}
entrada();



