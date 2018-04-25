// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

let ul = document.querySelector('ul');
let pre = document.querySelector('pre');
var films;

$.ajax({
  url: 'https://swapi.co/api/films/',
  method: 'GET',
  success: 
  	(response) => {
  		let list = '';  		
  		films = response.results.sort((a, b) => a.episode_id - b.episode_id);

		for(let film of films){
			epId = film.episode_id  			
  			list += '<li data-episode="' + epId + '" > Episode ' + romanize(epId) + '</li>';
  		}
  		
  		ul.innerHTML = list;  		
	}
});

$("ul").on('click', 'li', 
	(res) => {
		let episode = films[parseInt(res.currentTarget.dataset.episode) - 1];
		pre.innerHTML = '<section>Episode ' + romanize(episode.episode_id) 
						+ '</section> <section>' + episode.title.toUpperCase()
						+ '</section> <br/> <section>' + episode.opening_crawl
						+ '</section>';
	}
);

function romanize(num) {
  var lookup = {
  	M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
	roman = '',i;
	for ( i in lookup ) {
	while ( num >= lookup[i] ) {
	  roman += i;
	  num -= lookup[i];
	}
  }
  return roman;
}