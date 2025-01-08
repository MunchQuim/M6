if(sessionStorage.getItem('tropas') == null || sessionStorage.getItem('tropasRival') == null || sessionStorage.getItem('data') == null){
    window.location.href = 'ordenacion.html';
}
let tropas = JSON.parse(sessionStorage.getItem('tropas'));
let tropasRival = JSON.parse(sessionStorage.getItem('tropasRival'));
let data = JSON.parse(sessionStorage.getItem('data'));

let ejercito = [];
let ejercitoRival = [];
let muertos = [];

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
    constructor(vida, arma, armadura, moral, salvaguardia, vuln_veneno, tipo, array) {
        this.vida = vida;
        this.vida_max = vida;
        this.arma = arma;
        this.armadura = armadura;
        this.moral = moral;
        this.salvaguardia = salvaguardia;
        this.vuln_veneno = vuln_veneno;
        this.tipo = tipo;
        this.arrayRef = array;
    };
    combate(ejercitoEnemigo) {
        if (this.vida > 0) {
            //check de moral a ver si actua
            if (this.checkeoMoral()) {
                //escoge una tropa rival
                let ir = Math.floor(Math.random() * ejercitoEnemigo.length);
                /* console.log('la tropa ataca'); */
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
            return true;
        } else {
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
        /* console.log('la tropa atacada ha muerto'); */
        this.enMuerte();
    
        // Verifica que arrayRef está definido
        if (this.arrayRef) {
            let index = this.arrayRef.indexOf(this);
            if (index !== -1) {
                this.arrayRef.splice(index, 1); // Elimina la tropa del array original
            }
        }
    
        // Agrega la tropa a la lista de muertos
        if (typeof muertos !== 'undefined' && Array.isArray(muertos)) {
            muertos.push(this);
        }
    }
    enMuerte(){

    }
}




for (const tropa in tropas) {
    const cantidad = tropas[tropa];
    for (let index = 0; index < cantidad; index++) {
        let t = data['Tropas'][tropa];
        let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], tropa, ejercito);
        ejercito.push(newTropa);
    }
}
//reorganizamos el ejercito;
ejercito.sort(() => Math.random() - 0.5);

for (const tropa in tropasRival) {
    const cantidad = tropasRival[tropa];
    for (let index = 0; index < cantidad; index++) {
        let t = data['Tropas'][tropa];
        let newTropa = new Tropa(t['vida'], t['arma'], t['armadura'], t['moral'], t['salvaguardia'], t['vuln_veneno'], tropa, ejercitoRival);
        ejercitoRival.push(newTropa);
    }
}
ejercitoRival.sort(() => Math.random() - 0.5);



/*  */