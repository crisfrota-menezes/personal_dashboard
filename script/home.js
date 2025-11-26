const greetingMessageEl = document.getElementById("message");
const clockEl = document.getElementById("hour");

const weatherTitle = document.querySelector("#weather-section h2");
const weatherInfo = document.querySelector(".actual-weather");
const nextHoursElements = [
    document.querySelector(".time-weather-one"),
    document.querySelector(".time-weather-two"),
    document.querySelector(".time-weather-three")
];

// Coordenadas fixas (Curitiba)
const lat = -25.4284;
const lon = -49.2733;

// Função auxiliar para converter códigos WMO em Ícones Material Symbols
function getWeatherIcon(code, isDay = 1) {
    const icons = {
        0: isDay ? "wb_sunny" : "clear_night",
        1: isDay ? "partly_cloudy_day" : "nights_stay",
        2: isDay ? "partly_cloudy_day" : "nights_stay",
        3: "cloud",
        45: "foggy", 48: "foggy",
        51: "rainy", 53: "rainy", 55: "rainy",
        61: "rainy", 63: "rainy", 65: "rainy",
        80: "rainy", 81: "rainy", 82: "rainy",
        95: "thunderstorm", 96: "thunderstorm", 99: "thunderstorm"
    };
    return icons[code] || "cloud"; // Retorna 'cloud' se o código não existir
}

async function updateWeather() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,windspeed_10m&hourly=temperature_2m,weather_code&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();

        // Atualiza o Clima ATUAL
        const current = data.current;
        const iconName = getWeatherIcon(current.weather_code, current.is_day);
        
        weatherTitle.textContent = "Clima em Curitiba";
        weatherInfo.innerHTML = `
            <span class="material-symbols-outlined">${iconName}</span>
            ${Math.round(current.temperature_2m)}°C 
            <span style="font-size: 0.8rem; margin-left:auto; opacity: 0.7">Vento: ${current.windspeed_10m} km/h</span>
        `;

        // Atualiza as PRÓXIMAS 3 HORAS
        const currentHour = new Date().getHours();
        
        nextHoursElements.forEach((element, index) => {
            const targetHour = currentHour + index + 1;
            
            const timeIndex = data.hourly.time.findIndex(t => {
                const tDate = new Date(t);
                return tDate.getHours() === targetHour % 24; // % 24 garante que 24h vire 00h
            });

            if (timeIndex !== -1) {
                const temp = Math.round(data.hourly.temperature_2m[timeIndex]);
                const code = data.hourly.weather_code[timeIndex];
                const isDaySimple = (targetHour % 24) > 6 && (targetHour % 24) < 18 ? 1 : 0;
                const miniIcon = getWeatherIcon(code, isDaySimple);

                // ATUALIZADO: HTML estruturado para o novo layout vertical (Card)
                element.innerHTML = `
                    <span class="hour-label">${targetHour % 24}:00</span>
                    <div class="temp-label">
                        <span class="material-symbols-outlined" style="font-size: 1.4rem">${miniIcon}</span>
                        <span>${temp}°</span>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        weatherInfo.textContent = "Erro ao carregar dados.";
    }
}

updateWeather();
setInterval(updateWeather, 3600000);

function setupProductivityWidget() {
    const dateEl = document.getElementById("current-date");
    const weekDayEl = document.getElementById("current-week-day");
    
    const now = new Date();

    const dateOptions = { day: 'numeric', month: 'long' };
    const weekOptions = { weekday: 'long' };

    dateEl.textContent = now.toLocaleDateString('pt-BR', dateOptions);
    weekDayEl.textContent = now.toLocaleDateString('pt-BR', weekOptions);

    const focusInput = document.getElementById("focus-input");
    const savedFocus = localStorage.getItem("jarvis_focus");

    if (savedFocus) {
        focusInput.value = savedFocus;
    }

    focusInput.addEventListener("input", () => {
        localStorage.setItem("jarvis_focus", focusInput.value);
    });

    const eventsListEl = document.getElementById("events-list");
    
    const myEvents = [
        { date: "25/12", name: "Natal" },
        { date: "31/12", name: "Ano Novo" },
        { date: "15/01", name: "Início das Aulas" }
    ];

    const nextEvents = myEvents.slice(0, 2);

    eventsListEl.innerHTML = nextEvents.map(event => `
        <li>
            <span>${event.name}</span>
            <span class="event-date">${event.date}</span>
        </li>
    `).join('');
}

setupProductivityWidget();

function setupNotesWidget() {
    const notesInput = document.getElementById("jarvis-notes");
    const clearBtn = document.getElementById("clear-notes");
    const STORAGE_KEY = "jarvis_quick_notes";

    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
        notesInput.value = savedNotes;
    }

    notesInput.addEventListener("input", () => {
        localStorage.setItem(STORAGE_KEY, notesInput.value);
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if(confirm("Deseja apagar todas as notas?")) {
                notesInput.value = "";
                localStorage.removeItem(STORAGE_KEY);
            }
        });
    }
}

setupNotesWidget();

function refreshPanel() {
    const date = new Date();

    if (clockEl) {
        clockEl.textContent = "Horário: " + date.toLocaleTimeString("pt-BR");
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