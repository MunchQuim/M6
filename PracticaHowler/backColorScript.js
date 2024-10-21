const maxElements = 500;
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Crear un array con 500 colores aleatorios
const colorsArray = Array.from({ length: maxElements }, getRandomColor);

console.log(colorsArray);


const allElements = document.querySelectorAll('*');
let index = 0;
allElements.forEach(element => {  
    element.style.backgroundColor = colorsArray[index];
    index ++;
    if(index >= maxElements){  
        index = 0;
    }
});