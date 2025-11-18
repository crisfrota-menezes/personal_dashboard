const greetingMessageEl = document.getElementById("message");
const clockEl = document.getElementById("hour");

function refreshPanel() {
    const date = new Date();

    if (clockEl) {
        clockEl.textContent = "Agora são: " + date.toLocaleTimeString("pt-BR");
    }

    const now = date.getHours();

    if (greetingMessageEl) {
        if (now >= 5 && now < 12) {
            greetingMessageEl.textContent = "Bom Dia Chefe!";
        } else if (now >= 12 && now < 18) {
            greetingMessageEl.textContent = "Boa Tarde Chefe!";
        } else {
            greetingMessageEl.textContent = "Boa Noite Chefe!";
        }
    }
}

refreshPanel();
setInterval(refreshPanel, 1000);
