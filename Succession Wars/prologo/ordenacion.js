let data = JSON.parse(sessionStorage.getItem('data'));
let manoPropia = document.getElementById('manoContainer');
let eminenciasRival = JSON.parse(sessionStorage.getItem('eminenciasRival'));
let eminenciasPropias = JSON.parse(sessionStorage.getItem('eminenciasPropias'));
let tropas = JSON.parse(sessionStorage.getItem('tropas'));
let tropasRival = JSON.parse(sessionStorage.getItem('tropasRival'));
let mEscaramuza = document.getElementById('mEscaramuza');
let mBatalla = document.getElementById('mBatalla');
let mPersecucion = document.getElementById('mPersecucion');

let boton = document.getElementById('listo');
boton.addEventListener('click', () => {
    listo();
}, false);

let ready = [false, false, false];
// carga eminencias en la mano
eminenciasPropias.forEach(id => {
    let div = document.createElement('div');
    div.id = id;
    div.classList.add('carta');
    div.classList.add('draggable');
    manoPropia.appendChild(div);
});

// da las propiedades de drag a los elementos draggable
let allDraggables = document.querySelectorAll('.draggable');

allDraggables.forEach(element => {
    element.draggable = true;
    element.addEventListener('dragend', (event) => {
        mouseX = event.x;
        mouseY = event.y;
        // recojo el nuevo padre
        let newParent = document.elementFromPoint(mouseX, mouseY);

        if (newParent.classList.contains('dragObjective')) {
            newParent.appendChild(element);
        }

        // lo situa en el nuevo lugar
    }, false);
});
// recojo el numero de tropas
document.getElementById('numKnight').innerText = tropas['caballero'];
document.getElementById('numSoldier').innerText = tropas['soldado'];
document.getElementById('numPeasant').innerText = tropas['campesino'];
//
function listo() {
    // recojo todos estos datos y los añado a la sesion
    let eminenciasFases = [data['Eminencias'][mEscaramuza.children[0].id], data['Eminencias'][mBatalla.children[0].id], data['Eminencias'][mPersecucion.children[0].id]];
    let eminenciasFasesRival = eleccionIa();
    // hago que la ia recoja los datos
    console.log(eminenciasFases);
    console.log(eminenciasFasesRival);
    //guardo los datos en la sesion

    sessionStorage.setItem('eminenciasFasesRival', JSON.stringify(eminenciasFasesRival));
    sessionStorage.setItem('eminenciasFases', JSON.stringify(eminenciasFases));

    // voy a la batalla
   /*  window.location.href = 'batalla.html'; */
}
//observador que añadira la informacion que pertoque

const observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach(mutation => {
        if (mutation.type === 'childList') {

            mutation.addedNodes.forEach(node => {
                let fase;
                let eminencia = data['Eminencias'][node.id];
                /* console.log(eminencia); */
                switch (mutation.target.id) {
                    case 'mEscaramuza':
                        fase = 'fase1';
                        document.getElementById('escaramuza').querySelector('span').innerText = eminencia['descripciones'][fase];
                        ready[0] = true;
                        break;
                    case 'mBatalla':
                        fase = 'fase2';
                        document.getElementById('batalla').querySelector('span').innerText = eminencia['descripciones'][fase];
                        ready[1] = true;
                        break;
                    case 'mPersecucion':
                        fase = 'fase3';
                        document.getElementById('persecucion').querySelector('span').innerText = eminencia['descripciones'][fase];
                        ready[2] = true;
                        break;

                    default:
                        break;
                }


            });
            mutation.removedNodes.forEach(node => {
                switch (mutation.target.id) {
                    case 'mEscaramuza':
                        document.getElementById('escaramuza').querySelector('span').innerText = "";
                        ready[0] = false;
                        break;
                    case 'mBatalla':
                        document.getElementById('batalla').querySelector('span').innerText = "";
                        ready[1] = false;
                        break;
                    case 'mPersecucion':
                        document.getElementById('persecucion').querySelector('span').innerText = "";
                        ready[2] = false;
                        break;

                    default:
                        break;
                }

            })
            //cuando hayan 3 colocados, activar el boton 
            if (!ready.includes(false)) {
                boton.disabled = false;

            } else {
                boton.disabled = true;

            }

        }

    });
});
const config = { childList: true };

observer.observe(mEscaramuza, config);
observer.observe(mBatalla, config);
observer.observe(mPersecucion, config);

//ia
function eleccionIa() {
    let indexes = [0, 1, 2, 3];
    indexes.sort(() => Math.random() - 0.5);
    indexes.pop();

    return [data['Eminencias'][eminenciasRival[indexes[0]]], data['Eminencias'][eminenciasRival[indexes[1]]], data['Eminencias'][eminenciasRival[indexes[2]]]];
}


console.log(tropas);
console.log(tropasRival);