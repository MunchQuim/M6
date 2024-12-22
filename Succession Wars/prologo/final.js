let victoria = sessionStorage.getItem('victoria');
let data = JSON.parse(sessionStorage.getItem('data'));
console.log(sessionStorage);

let titulo;
let texto1;
let texto2;
let texto3;
if (victoria == true || victoria == 'true') {
    let eminencias = JSON.parse(sessionStorage.getItem('eminenciasPropias'));
    titulo = 'El Amargo Fruto de la Victoria';
    texto1 = 'Hoy ondea nuestro estandarte en el altozano, y la tierra retumba con los clamores de nuestro triunfo. Las murallas del enemigo se han derrumbado, y su ejército yace bajo nuestros pies, vencido. Pero mientras cabalgo entre las filas de los vivos, no puedo ignorar las montañas de muertos que esta guerra ha dejado. Es una victoria, sí, pero una que lleva el hedor de la muerte y el peso de una historia teñida de sangre.\n' +
        '¿Qué es, entonces, este triunfo? El oro y las coronas no devolverán las vidas perdidas ni llenarán los hogares vacíos. La victoria que he asegurado con tanto esfuerzo no puede acallar los gritos de los moribundos ni borrar las lágrimas de los que quedan. Pero aún así, he resistido. Porque sabía que si caía, todo lo que amamos perecería con nosotros.\n';
    texto2 = 'Aun así damos gracias a ' + data['Eminencias'][eminencias[0]]['personalizado'] + data['Eminencias'][eminencias[0]]['rol'] + ', ' + data['Eminencias'][eminencias[1]]['personalizado'] + data['Eminencias'][eminencias[1]]['rol'] + ', ' + data['Eminencias'][eminencias[2]]['personalizado'] + data['Eminencias'][eminencias[2]]['rol'] + ' y ' + data['Eminencias'][eminencias[3]]['personalizado'] + data['Eminencias'][eminencias[3]]['rol'] + " Cuyos esfuerzos y liderazgo nos han llevado a la victoria.\n";
    texto3 = 'Y aunque los muertos se cuentan por miles y todavia falta mucho por reconstruir. Hemos vencido';
}
else {
    let eminencias = JSON.parse(sessionStorage.getItem('eminenciasRivales'));
    console.log(eminencias);
    titulo = 'El Amargo Fruto de la Derrota';  
    texto1 = 'Hoy ondean los estandartes del enemigo en lo alto de nuestras murallas, y la tierra resuena con los clamores de su victoria. Nuestras defensas se han derrumbado, y los cuerpos de nuestros guerreros yacen dispersos, reclamados por el polvo. Cabalgo entre los restos de lo que una vez fue nuestro ejército, pero la muerte y el silencio se ciernen como un manto sobre nuestro reino. No hay gloria en lo que queda, solo ruinas y un lamento interminable que se alza al cielo.\n' +  
            '¿Qué es, entonces, este fracaso? No hay oro ni promesas que puedan mitigar la pérdida de nuestras vidas ni devolver el orgullo arrancado de nuestras tierras. La derrota que se cierne sobre nosotros no callará el llanto de los huérfanos ni detendrá el hambre que ya comienza a rondar nuestras aldeas. Pero aun así, no me desplomo. Porque aunque todo esté perdido, mi deber me exige soportar lo insoportable.\n';  
    texto2 = 'Que la ira de los dioses caigan sobre los traidores de ' + data['Eminencias'][eminencias[0]]['personalizado'] + data['Eminencias'][eminencias[0]]['rol'] + ', ' + data['Eminencias'][eminencias[1]]['personalizado'] + data['Eminencias'][eminencias[1]]['rol'] + ', ' + data['Eminencias'][eminencias[2]]['personalizado'] + data['Eminencias'][eminencias[2]]['rol'] + ' y ' + data['Eminencias'][eminencias[3]]['personalizado'] + data['Eminencias'][eminencias[3]]['rol'] +  ' y que nuestras muertes les atormenten por el resto de sus miserables dias.\n';  
    texto3 = 'Y aunque los muertos se cuentan por miles y las esperanzas se desmoronan como cenizas, el peso de esta derrota será el legado que cargaremos. La oscuridad se cierne sobre nosotros, y el reino tambalea al borde del abismo.';  
    
}
document.getElementById('title').innerText = titulo;
document.getElementById('texto1').innerText = texto1;
document.getElementById('texto2').innerText = texto2;
document.getElementById('texto3').innerText = texto3;