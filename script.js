const header = document.querySelector('.greeting');
const clock = document.querySelector('.clock');

function showGreeting()
{
    const hour = new Date().getHours();

    if (hour > 5 && hour < 12)
        header.textContent = "Bom Dia Chefe!";
    if (hour > 13 && hour < 18)
        header.textContent = "Boa Tarde Chefe!";
    else
        header.textContent = "Boa Noite Chefe!";
}

function showClock()
{
    const now = new Date().toLocaleTimeString();

    clock.textContent = "Agora são: " + now;
}

setInterval(showClock, 1000);
showGreeting();