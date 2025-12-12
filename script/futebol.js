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
