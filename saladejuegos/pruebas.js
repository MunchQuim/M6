//canvas
let canvas = document.getElementById('canvas');
//propiedades del canvas
let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;
//contexto del canvas
let ctx = canvas.getContext('2d');
//prueba de objeto
let objetos = []; //contendra todos los objetos tipo objeto

//creo al personaje
let personaje = new mainCharacter(100, 10, 5, 0, 0, 100, 100, './img/link.png', 25, 60, 50, 30, true);
let personajeImage = new Image;


personajeImage.src = personaje.getImgLink();
personaje.setImage(personajeImage);



let borde = new object(0, 0, canvasWidth, canvasHeight, null, 0, 0, canvasWidth, canvasHeight, true);

objetos.push(borde);
objetos.push(personaje);
let solidos = []; // contendra todos los objetos solidos
solidos.push(borde);
//dibujado

async function dibujado() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    objetos.forEach(objeto => {

        if (objeto.getImgLink() != null) {
            ctx.drawImage(objeto.getImage(), objeto.getPositionX(), objeto.getPositionY(), objeto.getWidth(), objeto.getHeight());   
        }
        dibujarHitbox(objeto);
    });

    requestAnimationFrame(dibujado);
}
dibujado();

async function dibujarHitbox(objeto) {

    ctx.beginPath();
    ctx.moveTo(objeto.getPositionX() + objeto.getHitboxX(), objeto.getPositionY() + objeto.getHitboxY());
    ctx.lineTo(objeto.getPositionX() + objeto.getHitboxX() + objeto.hitboxWidht, objeto.getPositionY() + objeto.getHitboxY());
    ctx.lineTo(objeto.getPositionX() + objeto.getHitboxX() + objeto.hitboxWidht, objeto.getPositionY() + objeto.getHitboxY() + objeto.getHitboxHeight());
    ctx.lineTo(objeto.getPositionX() + objeto.getHitboxX(), objeto.getPositionY() + objeto.getHitboxY() + objeto.getHitboxHeight());
    ctx.lineTo(objeto.getPositionX() + objeto.getHitboxX(), objeto.getPositionY() + objeto.getHitboxY());
    ctx.lineWidth = 5;  // Por ejemplo, grosor de 5 píxeles
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

