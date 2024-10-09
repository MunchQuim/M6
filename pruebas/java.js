/* const persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 20,
    direcciones:[{
        ciudad: 'Barcelona', pais: 'España'
    },{
        ciudad: 'Buenos aires', pais: 'Argentina'
    },{
        ciudad: 'Despeñaperros', pais: 'España'
    },{
        ciudad: 'Zaraguay', pais: 'Españistan'
    }]
}

persona.direcciones.forEach(elemento => {
    console.log(elemento.ciudad + " "+ elemento.pais+"\n");
});

//desestructuracion
// estas creando constantes que recogen los datos del objeto al que se iguala

const{nombre, apellido, edad, direcciones} = persona;
console.log(nombre); // aqui nombre es el nombre de persona
nombre = persona;
console.log(nombre); // aqui nombre ES persona
console.log(direcciones.map(elemento => elemento.ciudad)) */