const sidebar = document.querySelector(".sidebar");
const sidebarToggleButton = document.querySelector(".sidebar-toggle");
const themeToggleButton = document.querySelector(".theme-toggle");
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

sidebarToggleButton.addEventListener("click", () => {
    const isCollapsed = sidebar.classList.toggle("collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed);
    updateThemeIcon();
});

themeToggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});

function loadCollapsed() {
    if (localStorage.getItem("sidebarCollapsed") == "true") {
        sidebar.classList.add("collapsed");
    }
}