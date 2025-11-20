const sidebar = document.querySelector(".sidebar");
const sidebarToggleButton = document.querySelector(".sidebar-toggle");
const themeToggleButton = document.querySelector(".theme-toggle");
const greetingMessageEl = document.getElementById("message");
const clockEl = document.getElementById("hour");
const themeIcon = themeToggleButton.querySelector(".theme-icon");

const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
}

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDark = savedTheme === "dark" || (savedTheme === null && systemPrefersDark);

document.body.classList.toggle("dark-theme", shouldUseDark);
updateThemeIcon();

const activePage = window.location.pathname.split("/").pop();

const menuLinks = document.querySelectorAll(".menu-link");
menuLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === activePage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

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

sidebarToggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
});

themeToggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});