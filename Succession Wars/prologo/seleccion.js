if(sessionStorage.getItem('data') == null){
    window.location.href = 'menu.html';
}
let turno = true;
let mouseX;
let mouseY;
let manoPropia = document.getElementById('manoContainer');
let manoRival = document.getElementById('manoContainerRival');
let allDraggables = document.querySelectorAll('.draggable');
let data = JSON.parse(sessionStorage.getItem('data'));
allDraggables.forEach(element => {
    element.draggable = true;
    element.addEventListener('dragend', (event) => {
        mouseX = event.x;
        mouseY = event.y;
        // recojo el nuevo padre
        let newParent = document.elementFromPoint(mouseX, mouseY);

        //controlo que el padre no sea el mismo
        if (newParent.classList.contains('dragObjective')) {
            newParent.appendChild(element);
        }

        // lo situa en el nuevo lugar
    }, false);
});

function cambiarDraggables(bol) {

    if (!(bol && manoPropia.querySelectorAll('.carta').length >= 4)) {

        allDraggables.forEach(element => {
            element.draggable = bol;
        });
    }
}


const observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach(mutation => {
        if (mutation.type === 'childList') {
            /* console.log(mutation.target); */

            if (manoRival.querySelectorAll('.carta').length == 4 && manoPropia.querySelectorAll('.carta').length == 4) {
                //funcion que recoja los datos y los ponga en el local storage
                guardarDatos();
                window.location.href = 'ordenacion.html';
            }else{
                mutation.addedNodes.forEach(node => {
                    if (node.classList.contains('draggable')) {
                        node.classList.remove('draggable');
                        if (mutation.target == manoPropia) {
                            turno = false;
                            cambiarDraggables(turno);
                            turnoRival();
                        } else {
                            turno = true
                            cambiarDraggables(turno);
                        }
                    }
                });
            }
        }

    });
});
const config = { childList: true };

observer.observe(manoPropia, config);
observer.observe(manoRival, config);

function guardarDatos() {
    
    let eminenciasRival = [];
    let eminenciasPropias = [];
    manoRival.querySelectorAll('.carta').forEach(carta => {
        eminenciasRival.push(carta.id);
    })
    manoPropia.querySelectorAll('.carta').forEach(carta => {
        eminenciasPropias.push(carta.id);
    })

    sessionStorage.setItem("eminenciasRival", JSON.stringify(eminenciasRival));
    sessionStorage.setItem("eminenciasPropias", JSON.stringify(eminenciasPropias));

    eminenciasRival = JSON.parse(sessionStorage.getItem('eminenciasRival'));
    eminenciasPropias = JSON.parse(sessionStorage.getItem('eminenciasPropias'));

    //tropas
    let tropas = { 'caballero': 0, 'soldado': 0, 'campesino': 0, 'zombie': 0, 'verdugo': 0, 'paladin': 0 };
    let tropasRival = { 'caballero': 0, 'soldado': 0, 'campesino': 0, 'zombie': 0, 'verdugo': 0, 'paladin': 0 };


    eminenciasPropias.forEach(eminencia => {
        let troops = data['Eminencias'][eminencia]['tropas'];
        for (let index = 0; index < troops['caballero']['cantidad']; index++) {
            tropas.caballero += Math.floor(Math.random() * troops['caballero']['caras']) + 1;
        }
        for (let index = 0; index < troops['soldado']['cantidad']; index++) {
            tropas.soldado += Math.floor(Math.random() * troops['soldado']['caras']) + 1;
        }
        for (let index = 0; index < troops['campesino']['cantidad']; index++) {
            tropas.campesino += Math.floor(Math.random() * troops['campesino']['caras']) + 1;
        }
    });
    eminenciasRival.forEach(eminencia => {
        let troops = data['Eminencias'][eminencia]['tropas']
        for (let index = 0; index < troops['caballero']['cantidad']; index++) {
            tropasRival.caballero += Math.floor(Math.random() * troops['caballero']['caras']) + 1;
        }
        for (let index = 0; index < troops['soldado']['cantidad']; index++) {
            tropasRival.soldado += Math.floor(Math.random() * troops['soldado']['caras']) + 1;
        }
        for (let index = 0; index < troops['campesino']['cantidad']; index++) {
            tropasRival.campesino += Math.floor(Math.random() * troops['campesino']['caras']) + 1;
        }
    });

    sessionStorage.setItem("tropasRival", JSON.stringify(tropasRival));
    sessionStorage.setItem("tropas", JSON.stringify(tropas));
    console.log(tropas);
}


/// funciones del rival
function turnoRival() {

    if (manoRival.querySelectorAll('.carta').length < 4) {
        let parentCartas = document.getElementById('gridCentral');
        let cartas = parentCartas.querySelectorAll('.carta');
        let randomNum = Math.floor(Math.random() * cartas.length);
        manoRival.appendChild(cartas[randomNum]);
    }
    turno = true;
    cambiarDraggables(turno);
}