let info = [];

const loadPlayers = async () => {
    let response = await fetch('./scripts/info.json')
    info = await response.json();
    info.forEach(player => {
        console.log(player.jugador);
    });
    console.log(info);
}

loadPlayers();


console.log(info);