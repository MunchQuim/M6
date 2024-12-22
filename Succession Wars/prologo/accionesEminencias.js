/* let data = JSON.parse(sessionStorage.getItem('data')); */
let eminenciasFasesRival = JSON.parse(sessionStorage.getItem('eminenciasFasesRival'));
let eminenciasFases = JSON.parse(sessionStorage.getItem('eminenciasFases'));

let acciones = [];
let accionesRivales = [];
let listaEminencias = [];
class Eminencia {
    rol;
    ejercitoPropio;
    accionesEnemigas;
    ejercitoEnemigo;
    prioridad; //0 mas rapido 
    acciones = {

    };
    constructor(rol, prioridad) {
        this.rol = rol;
        this.prioridad = prioridad;
    }
}
//parroco
let Parroco = new Eminencia('Párroco', 2);
Parroco.acciones.fase1 = () => {
    ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
}
Parroco.acciones.fase2 = () => {
    ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
}
Parroco.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
    });
}
listaEminencias.push(Parroco);

//reina
let Reina = new Eminencia('Reina regente', 0);
Reina.acciones.fase1 = () => {
    accionesEnemigas[0] = null;
}
Reina.acciones.fase2 = () => {
    accionesEnemigas[1] = null;
}
Reina.acciones.fase3 = () => {
    accionesEnemigas[2] = null;
}
listaEminencias.push(Reina);
//paladin
let Paladin = new Eminencia('Paladín', 3);
Paladin.acciones.fase1 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
        tropa['armadura'] += 1;
        tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['armadura'] -= 1;
            tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
Paladin.acciones.fase2 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
        tropa['armadura'] += 1;
        tropa['moral'] = Math.min(tropa['moral'] + 5, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['armadura'] -= 1;
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
Paladin.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 2, 90);
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['moral'] = Math.max(tropa['moral'] - 2, 10);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
listaEminencias.push(Paladin);
//herrero
let Herrero = new Eminencia('Herrero', 4);
Herrero.acciones.fase1 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
        tropa['armadura'] += 1;
    });
}
Herrero.acciones.fase2 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 2;
        tropa['armadura'] += 2;
    });
}
Herrero.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 2;
        tropa['armadura'] += 2;
    });
}
listaEminencias.push(Herrero);
//nigromante
let Nigromante = new Eminencia('Nigromante', 12);
Nigromante.acciones.fase1 = () => {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie');
            newTropa.arrayRef = ejercitoPropio;
            ejercitoPropio.push(newTropa);
        }
    }
}
Nigromante.acciones.fase2 = () => {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie');
            newTropa.arrayRef = ejercitoPropio;
            ejercitoPropio.push(newTropa);
        }
    }
}
Nigromante.acciones.fase3 = () => {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie');
            newTropa.arrayRef = ejercitoPropio;
            ejercitoPropio.push(newTropa);
        }
    }
}
listaEminencias.push(Nigromante);
//tabernero
let Tabernero = new Eminencia('Tabernero', 5);
Tabernero.acciones.fase1 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}
Tabernero.acciones.fase2 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}
Tabernero.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}
listaEminencias.push(Tabernero);
//cobrador
let Cobrador = new Eminencia('Cobrador de impuestos', 6);
Cobrador.acciones.fase1 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let tiradaArma = Math.floor(Math.random() * 100) + 1;
        let tiradaArmadura = Math.floor(Math.random() * 100) + 1;
        if(tiradaArma<=50){
            tropa['arma'] = Math.max(tropa['arma']-1,0);
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        }
        if(tiradaArmadura<=50){
            tropa['armadura'] = Math.max(tropa['armadura']-1,0);
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        }
    });
}
Cobrador.acciones.fase2 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let tiradaArma = Math.floor(Math.random() * 100) + 1;
        let tiradaArmadura = Math.floor(Math.random() * 100) + 1;
        if(tiradaArma<=50){
            tropa['arma'] = Math.max(tropa['arma']-1,0);
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        }
        if(tiradaArmadura<=50){
            tropa['armadura'] = Math.max(tropa['armadura']-1,0);
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        }
    });
}
Cobrador.acciones.fase3 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let tiradaArma = Math.floor(Math.random() * 100) + 1;
        let tiradaArmadura = Math.floor(Math.random() * 100) + 1;
        if(tiradaArma<=50){
            tropa['arma'] = Math.max(tropa['arma']-2,0);
            tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
        }
        if(tiradaArmadura<=50){
            tropa['armadura'] = Math.max(tropa['armadura']-2,0);
            tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
        }
    });
}
listaEminencias.push(Cobrador);
//alquimista
let Alquimista = new Eminencia('Alquimista', 11);
Alquimista.acciones.fase1 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
    });
    ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}
Alquimista.acciones.fase2 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
    });
    ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}
Alquimista.acciones.fase3 = () => {
    ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
    });
    ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * 8) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}
listaEminencias.push(Alquimista);

//medico
let Medico = new Eminencia('Médico de la plaga', 7);
Medico.acciones.fase1 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['vuln_veneno'] = 0;
        if(tropa['tipo']=='campesino'){
            tropa['vida_max'] += 2;
            tropa['vida'] +=2;
        }
        if(tropa['tipo']=='soldado'){
            tropa['vida_max'] += 1;
            tropa['vida'] +=1;
        }
    });
}
Medico.acciones.fase2 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['vuln_veneno'] = 0;
        if(tropa['tipo']=='campesino'){
            tropa['vida_max'] += 2;
            tropa['vida'] +=2;
        }
        if(tropa['tipo']=='soldado'){
            tropa['vida_max'] += 1;
            tropa['vida'] +=1;
        }
    });
}
Medico.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['vuln_veneno'] = 0;
        if(tropa['tipo']=='campesino'){
            tropa['vida_max'] += 2;
            tropa['vida'] +=2;
        }
        if(tropa['tipo']=='soldado'){
            tropa['vida_max'] += 1;
            tropa['vida'] +=1;
        }
    });
}
listaEminencias.push(Medico);

//verdugo
let Verdugo = new Eminencia('Verdugo', 8);
Verdugo.acciones.fase1 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 5, 90);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
Verdugo.acciones.fase2 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
Verdugo.acciones.fase3 = () => {
    ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo');
    newTropa.arrayRef = ejercitoPropio;
    newTropa.enMuerte() = () => {
        ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 15, 90);
        });
    }
    //añadimos la tropa al ejercito
    ejercitoPropio.push(newTropa);
}
listaEminencias.push(Verdugo);
//bufon
let Bufon = new Eminencia('Bufón de la corte', 10);
let index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase1 = listaEminencias[index].acciones.fase1;
index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase2 = listaEminencias[index].acciones.fase2;
index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase3 = listaEminencias[index].acciones.fase3;
listaEminencias.push(Bufon);


//tengo que convertir las eminencias en sus respectivas fases y asignarles unos enemigos u otros

for (let index = 0; index < 3; index++) {
    listaEminencias.forEach(eminencia=>{
        if(eminenciasFases[index]['rol'] == eminencia['rol']){
            //modificar la eminencia
            eminencia.accionesEnemigas = accionesRivales;
            eminencia.ejercitoEnemigo  = ejercitoRival;
            eminencia.ejercitoPropio = ejercito;
            //pasar la accion
            acciones.push(eminencia.acciones['fase'+(index+1)]);
        }
        else if(eminenciasFasesRival[index]['rol'] == eminencia['rol']){
            //modificar la eminencia
            eminencia.accionesEnemigas = acciones;
            eminencia.ejercitoEnemigo  = ejercito;
            eminencia.ejercitoPropio = ejercitoRival;
            //pasar la accion
            accionesRivales.push(eminencia.acciones['fase'+(index+1)]);
        }
    })

}
