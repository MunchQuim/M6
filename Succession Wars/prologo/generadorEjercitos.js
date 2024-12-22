let tropas = JSON.parse(sessionStorage.getItem('tropas'));
let tropasRival = JSON.parse(sessionStorage.getItem('tropasRival'));
let data = JSON.parse(sessionStorage.getItem('data'));


class Tropa {
    arma;
    armadura;
    moral;
    salvaguardia;
    vida;
    vida_max;
    vuln_veneno;
    tipo;
    arrayRef;
    constructor(vida, arma, armadura, moral, salvaguardia, vuln_veneno, tipo) {
        this.vida = vida;
        this.vida_max = vida;
        this.arma = arma;
        this.armadura = armadura;
        this.moral = moral;
        this.salvaguardia = salvaguardia;
        this.vuln_veneno = vuln_veneno;
        this.tipo = tipo;
    };
    combate(ejercitoEnemigo) {
        if (this.vida > 0) {
            //check de moral a ver si actua
            if (this.checkeoMoral()) {
                //escoge una tropa rival
                let ir = Math.floor(Math.random() * ejercitoEnemigo.length);
                //dependiendo del arma y armadura hace mas o menos daño;
                if (ejercitoEnemigo[ir]['armadura'] <= this.arma) { //si hay 0 0 evitamos tener que divir entre 0
                    //hace daño a la tropa
                    let dmg = Math.max(this.arma - ejercitoEnemigo[ir]['armadura'],1);
                    ejercitoEnemigo[ir].recibirDmg(dmg);
                } else {
                    let prob = Math.max(100 * this.arma / ejercitoEnemigo[ir]['armadura'],20);//minimo un 20% de probabilidad de dañar
                    let result = Math.floor(Math.random * 100) + 1;//1-100
                    if (prob <= result) {
                        ejercitoEnemigo[ir].recibirDmg(1);
                    }
                }
            }
        }
    }
    checkeoMoral() {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if (tirada <= this.moral) {
            setTimeout(() => {
                console.log(this+' ha pasado un chequeo de moral');
              }, 1000);
            return true;
        } else {
            setTimeout(() => {
                console.log(this+' ha pasado un chequeo de moral');
              }, 1000);
            return false;
        }
        
    }
    recibirDmg(dmg) {
        let tirada = Math.floor(Math.random() * 100) + 1;
        if(tirada>this.salvaguardia){//salvaguardia impide el daño
            this.vida = Math.max(this.vida - dmg, 0);
            if(this.vida<=0){
                this.morir();
            }
        }
        
    }
    curarVida(cura) {
        this.vida = Math.min(this.vida + cura, this.vida_max);
    }
    morir() {
        this.enMuerte();
        //si hay problemas de memoria cambiar esto
        let index = this.arrayRef.indexOf(this);
        if (index !== -1) {
            this.arrayRef.splice(index, 1);
            this.array = muertos;
            /*let indexEjercito = ejercito.indexOf(this);
            let indexEjercitoRival = ejercitoRival.indexOf(this);
    
            if (indexEjercito !== -1) {
                ejercito.splice(indexEjercito, 1); 
            } else if (indexEjercitoRival !== -1) {
                ejercitoRival.splice(indexEjercitoRival, 1); 
            } */
            muertos.push(this);
        }

    }
    enMuerte(){

    }
}


let ejercito = [];
let ejercitoRival = [];
let muertos = [];

for (const tropa in tropas) {
    const cantidad = tropas[tropa];
    let t = data['Tropas'][tropa];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], tropa);
    newTropa.arrayRef = ejercito;
    //creo un array de la cantidad correspondiente
    let array = Array(cantidad).fill(newTropa);
    //meto el array dentro del ejercito
    ejercito.push(...array);
}
//reorganizamos el ejercito;
ejercito.sort(() => Math.random() - 0.5);

for (const tropa in tropasRival) {
    const cantidad = tropasRival[tropa];
    let t = data['Tropas'][tropa];
    let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], tropa);
    newTropa.arrayRef = ejercito;
    //creo un array de la cantidad correspondiente
    let array = Array(cantidad).fill(newTropa);
    //meto el array dentro del ejercito
    ejercitoRival.push(...array);
}
ejercitoRival.sort(() => Math.random() - 0.5);
console.log(ejercito[1]);






/*  */