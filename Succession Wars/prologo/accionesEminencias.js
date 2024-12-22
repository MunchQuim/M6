/* let data = JSON.parse(sessionStorage.getItem('data')); */
let eminenciasFasesRival = JSON.parse(sessionStorage.getItem('eminenciasFasesRival'));
let eminenciasFases = JSON.parse(sessionStorage.getItem('eminenciasFases'));

let acciones = [];
let accionesRivales = [];
let listaEminencias = [];
let dañoAlquimico = 6;
class Eminencia {
    rol;
    ejercitoPropio;
    accionesEnemigas;
    ejercitoEnemigo;
    prioridad; //0 mas rapido 
    acciones = {
        fase1(){},
        fase2(){},
        fase3(){},

    };
    constructor(rol, prioridad) {
        this.rol = rol;
        this.prioridad = prioridad;
    }
}
//parroco
let Parroco = new Eminencia('Párroco', 2);
Parroco.acciones.fase1 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
}.bind(Parroco);
Parroco.acciones.fase2 =function() {
    this.ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
}.bind(Parroco)
Parroco.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
    });
}.bind(Parroco)
listaEminencias.push(Parroco);

//reina
let Reina = new Eminencia('Reina regente', 0);
Reina.acciones.fase1 = function() {
    this.accionesEnemigas[0] = null;
}.bind(Reina)
Reina.acciones.fase2 = function() {
    this.accionesEnemigas[1] = null;
}.bind(Reina)
Reina.acciones.fase3 = function() {
    this.accionesEnemigas[2] = null;
}.bind(Reina)
listaEminencias.push(Reina);
//paladin
let Paladin = new Eminencia('Paladín', 3);
Paladin.acciones.fase1 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
        tropa['armadura'] += 1;
        tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin',this.ejercitoPropio);
    /* newTropa.enMuerte() = () => {//vigilar
        Paladin.ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['armadura'] -= 1;
            tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
        });
    } */
    //añadimos la tropa al ejercito
    this.ejercitoPropio.push(newTropa);
}.bind(Paladin)
Paladin.acciones.fase2 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
        tropa['armadura'] += 1;
        tropa['moral'] = Math.min(tropa['moral'] + 5, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin',this.ejercitoPropio);
    /* newTropa.enMuerte() = () => {
        Paladin.ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['armadura'] -= 1;
            tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
        });
    } */
    //añadimos la tropa al ejercito
    this.ejercitoPropio.push(newTropa);
}.bind(Paladin)
Paladin.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 2, 90);
        tropa['salvaguardia'] = Math.min(tropa['salvaguardia'] + 5, 90);
    });
    //genero una nueva tropa paladin
    let t = data['Tropas']['paladin'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'paladin',this.ejercitoPropio);
   /*  newTropa.enMuerte() = () => {
        Paladin.ejercitoPropio.forEach(tropa => {
            tropa['salvaguardia'] = Math.max(tropa['salvaguardia'] - 5, 10);
            tropa['moral'] = Math.max(tropa['moral'] - 2, 10);
        });
    } */
    //añadimos la tropa al ejercito
    this.ejercitoPropio.push(newTropa);
}.bind(Paladin)
listaEminencias.push(Paladin);
//herrero
let Herrero = new Eminencia('Herrero', 4);
Herrero.acciones.fase1 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
        tropa['armadura'] += 1;
    });
}.bind(Herrero)
Herrero.acciones.fase2 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 2;
        tropa['armadura'] += 2;
    });
}.bind(Herrero)
Herrero.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 2;
        tropa['armadura'] += 2;
    });
}.bind(Herrero)
listaEminencias.push(Herrero);
//nigromante
let Nigromante = new Eminencia('Nigromante', 12);
Nigromante.acciones.fase1 = function() {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie',this.ejercitoPropio);
            this.ejercitoPropio.push(newTropa);
        }
    }
}.bind(Nigromante)
Nigromante.acciones.fase2 = function() {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            console.log('a');
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie',this.ejercitoPropio);
            this.ejercitoPropio.push(newTropa);
        }
    }
}.bind(Nigromante)
Nigromante.acciones.fase3 = function() {
    let long = muertos.length;
    for (let index = long - 1; index >= 0; index--) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= 25) {
            //elimino el muerto del array de muertos
            muertos.splice(index, 1);
            //creo un zombie
            let t = data['Tropas']['zombie'];
            let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'zombie',this.ejercitoPropio);
            this.ejercitoPropio.push(newTropa);
        }
    }
}.bind(Nigromante)
listaEminencias.push(Nigromante);
//tabernero
let Tabernero = new Eminencia('Tabernero', 5);
Tabernero.acciones.fase1 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}.bind(Tabernero)
Tabernero.acciones.fase2 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}.bind(Tabernero)
Tabernero.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['moral'] = Math.min(tropa['moral'] + 20, 90);
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada > 5 && tirada <= 25) {
           tropa.recibirDmg(1);
        } else if (tirada <= 5) {
            tropa.recibirDmg(2);
        }
    });
}.bind(Tabernero)
listaEminencias.push(Tabernero);
//cobrador
let Cobrador = new Eminencia('Cobrador de impuestos', 6);
Cobrador.acciones.fase1 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
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
}.bind(Cobrador)
Cobrador.acciones.fase2 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
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
}.bind(Cobrador)
Cobrador.acciones.fase3 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
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
}.bind(Cobrador)
listaEminencias.push(Cobrador);
//alquimista
let Alquimista = new Eminencia('Alquimista', 11);
Alquimista.acciones.fase1 = function() {
    let sum = 0;
    this.ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
/*         console.log('la tropa correspondiente a: ');
        console.log(tropa['arrayRef']);
        console.log(" ha sufrido "+dmg); */
    });
    this.ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}.bind(Alquimista)
Alquimista.acciones.fase2 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
        
    });
    this.ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}.bind(Alquimista)
Alquimista.acciones.fase3 = function() {
    this.ejercitoEnemigo.forEach(tropa => {
        let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
        tropa.recibirDmg(dmg);
    });
    this.ejercitoPropio.forEach(tropa => {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada<= 15){
            let dmg = (Math.floor(Math.random() * dañoAlquimico) + 1)*tropa['vuln_veneno'];
            tropa.recibirDmg(dmg);
        }
       
    });
}.bind(Alquimista)
listaEminencias.push(Alquimista);

//medico
let Medico = new Eminencia('Médico de la plaga', 7);
Medico.acciones.fase1 = function() {
    this.ejercitoPropio.forEach(tropa => {
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
}.bind(Medico)
Medico.acciones.fase2 = function() {
    this.ejercitoPropio.forEach(tropa => {
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
}.bind(Medico)
Medico.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
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
}.bind(Medico)
listaEminencias.push(Medico);

//verdugo
let Verdugo = new Eminencia('Verdugo', 8);
Verdugo.acciones.fase1 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    this.ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 5, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo',this.ejercitoPropio);
    /* newTropa.enMuerte() = () => {
        Verdugo.ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        Verdugo.ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 5, 90);
        });
    } */
    //añadimos la tropa al ejercito
    this.ejercitoPropio.push(newTropa);
}.bind(Verdugo)
Verdugo.acciones.fase2 = function() {
    
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    this.ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 10, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo',this.ejercitoPropio);
    /* newTropa.enMuerte() = () => {
        Verdugo.ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        Verdugo.ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 10, 90);
        });
    } */
    //añadimos la tropa al ejercito
    this.ejercitoPropio.push(newTropa);
    console.log(this.ejercitoPropio);
}.bind(Verdugo)
Verdugo.acciones.fase3 = function() {
    this.ejercitoPropio.forEach(tropa => {
        tropa['arma'] += 1;
    });
    this.ejercitoEnemigo.forEach(tropa => {
        tropa['moral'] = Math.max(tropa['moral'] - 15, 10);
    });
    //genero una nueva tropa Verdugo
    let t = data['Tropas']['verdugo'];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], 'verdugo',this.ejercitoPropio);
    /* newTropa.enMuerte() = () => {
        Verdugo.ejercitoPropio.forEach(tropa => {
            tropa['arma'] = Math.max(tropa['arma']-1,0);
        });
        Verdugo.ejercitoEnemigo.forEach(tropa => {
            tropa['moral'] = Math.min(tropa['moral'] + 15, 90);
        });
    } */
    //añadimos la tropa al ejercito
    Verdugo.ejercitoPropio.push(newTropa);
}.bind(Verdugo)
listaEminencias.push(Verdugo);
//bufon
/* let Bufon = new Eminencia('Bufón de la corte', 10);
let index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase1 = listaEminencias[index].acciones.fase1;
index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase2 = listaEminencias[index].acciones.fase2;
index = Math.floor(Math.random() * listaEminencias.length);
Bufon.acciones.fase3 = listaEminencias[index].acciones.fase3;
listaEminencias.push(Bufon); */


//tengo que convertir las eminencias en sus respectivas fases y asignarles unos enemigos u otros

for (let index = 0; index < 3; index++) {
    listaEminencias.forEach(eminencia=>{
        if(eminenciasFases[index]['rol'] == eminencia['rol']){
            //modificar la eminencia
            eminencia.accionesEnemigas = accionesRivales;
            eminencia.ejercitoEnemigo  = ejercitoRival;
            eminencia.ejercitoPropio = ejercito;
            let accion = {
                "accion": eminencia.acciones['fase'+(index+1)],
                "prioridad":eminencia.prioridad
            }
            
            //pasar la accion
            /* acciones.push(eminencia.acciones['fase'+(index+1)]); */
            acciones.push(accion);
        }
        else if(eminenciasFasesRival[index]['rol'] == eminencia['rol']){
            //modificar la eminencia
            eminencia.accionesEnemigas = acciones;
            eminencia.ejercitoEnemigo  = ejercito;
            eminencia.ejercitoPropio = ejercitoRival;
            console.log(eminencia.ejercitoEnemigo);
            //pasar la accion
            let accion = {
                "accion": eminencia.acciones['fase'+(index+1)],
                "prioridad":eminencia.prioridad
            }
            /* accionesRivales.push(eminencia.acciones['fase'+(index+1)]); */
            accionesRivales.push(accion);
        }
    })

}
