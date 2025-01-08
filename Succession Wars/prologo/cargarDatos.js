//recojo los datos de la data

async function recogerDatos() {
    let data= [];
    const response = await fetch('../data/data.json');
    data = await response.json();
    sessionStorage.setItem('data',JSON.stringify(data));
    console.log(data);
    document.getElementById('iniciar').disabled = false;
}
recogerDatos();