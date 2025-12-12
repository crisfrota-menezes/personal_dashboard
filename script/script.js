const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c87a8c5214msh458cc6cc178fec8p131c57jsnbbcbc338c2a8', // Você pega isso no site
		'X-RapidAPI-Host': 'api-football.p.rapidapi.com'
	}
};

// Exemplo: Pegando jogos ao vivo ou de uma liga específica
fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=33-34', options)
	.then(response => response.json())
	.then(response => {
        const lista = document.getElementById('lista-jogos');
        lista.innerHTML = ''; // Limpa o "Carregando"
        
        // Loop simples para mostrar os jogos (simplificado)
        response.response.forEach(jogo => {
            const li = document.createElement('li');
            li.className = 'match-item';
            li.innerHTML = `
                <span>${jogo.teams.home.name}</span>
                <strong>${jogo.goals.home} x ${jogo.goals.away}</strong>
                <span>${jogo.teams.away.name}</span>
            `;
            lista.appendChild(li);
        });
	})
	.catch(err => console.error(err)
);

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

console.log(activePage);

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
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
});

themeToggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});