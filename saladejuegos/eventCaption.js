let movimiento = [0, 0]
let derecha = false;
let izquierda = false;
let arriba = false;
let abajo = false;
document.addEventListener(
    'keydown', (e) => {
        switch (e.key) {
            case 'a':
            case 'A':
                izquierda = true;
                break;
            case 'w':
            case 'W':
                arriba = true;
                break;
            case 's':
            case 'S':
                abajo = true;
                break;
            case 'd':
            case 'D':
                derecha = true;
                break;

            default:
                break;
        }
        calcularMovimiento();
    }, false

);
document.addEventListener(
    'keyup', (e) => {
        switch (e.key) {
            case 'a':
            case 'A':
                izquierda = false;
                break;
            case 'w':
            case 'W':
                arriba = false;
                break;
            case 's':
            case 'S':
                abajo = false;
                break;
            case 'd':
            case 'D':
                derecha = false;
                break;

            default:
                break;
        }
        calcularMovimiento();
    }, false
);
async function calcularMovimiento() {
    //movimiento horizontal
    if (derecha && !izquierda) {
        movimiento[0] = 1;
    }
    if (!derecha && izquierda) {
        movimiento[0] = -1;
    }
    if (derecha===izquierda) {
        movimiento[0] = 0;
    }
    //movimiento vertical
    if (arriba && !abajo) {
        movimiento[1] = -1;
    }
    if (!arriba && abajo) {
        movimiento[1] = 1;
    }
    if (arriba===abajo) {
        movimiento[1] = 0;
    }
}
async function enviarMovimiento() {
    personaje.movement(movimiento[0], movimiento[1], 1);
    requestAnimationFrame(enviarMovimiento);
}
enviarMovimiento();