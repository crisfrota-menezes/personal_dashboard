const message = document.getElementById('message');
const hour = document.getElementById('hour');

function refreshPanel() {
    const agora = new Date();
    hour.textContent = "Agora são: " + agora.toLocaleTimeString('pt-BR');

    const now = agora.getHours();

    if (now >= 5 && now < 12) {
        message.textContent = "Bom Dia Chefe!";
    } else if (now >= 12 && now < 18) {
        message.textContent = "Boa Tarde Chefe!";
    } else {
        message.textContent = "Boa Noite Chefe!";
    }
}

setInterval(refreshPanel(), 1000);