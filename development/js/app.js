// React-Router
const {browserHistory, Router, Route, IndexRoute, Link} = window.ReactRouter;

// Fisher–Yates shuffle algorithm
function shuffle(arr) {
	var m = arr.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}

function pokedex() {
	let idArr = [];
	for (let i = 1; i <= 151; i++) {
		idArr.push(i);
	}
	return shuffle(idArr);
}

function convertWeight(weight) {
	if (!isNaN(weight)) return (weight * 0.220462).toFixed(0);
}

function convertHeight(height) {
	if (!isNaN(height)) {
		let converted = (height * 0.328084);
		let feet = Math.floor(converted);
		let inches = ((converted - feet) * 3.93701).toFixed(0);
		return feet + "'" + inches + '"';
	}
}

class PokemonStats extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let sprite = this.props.sprite;
		let converted_weight = convertWeight(pokemon.weight);
		if (pokemon.national_id < 10) {
			pokemon.formatted_id = '00' + pokemon.national_id;
		} else if (pokemon.national_id < 100) {
			pokemon.formatted_id = '0' + pokemon.national_id;
		} else {
			pokemon.formatted_id = pokemon.national_id;
		}

		return (
			<div className="card">
				<div className="name">
					<h2>{pokemon.name}</h2>
					<p>{pokemon.hp}HP</p>
				</div>
				<div className="image">
					<img src={sprite} />
				</div>
				<div className="stats">
					Length: {convertHeight(pokemon.height)},
					Weight: {convertWeight(pokemon.weight)} lbs.
				</div>
				<div className="about">
					<div className="id">
						<h3>{pokemon.formatted_id}/151</h3>
					</div>
					<div className="abilities">
						<p>Attack: {pokemon.attack}</p>
						<p>Defense: {pokemon.defense}</p>
						<p>Speed: {pokemon.speed}</p>
					</div>
				</div>
			</div>
		);
	}
}

class PokemonCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pokemon: {}};
		this.getPokemon();
	}

	getPokemon() {
		$.get(`http://pokeapi.co/api/v1/pokemon/${this.props.pokemonId}`).done(pokemon => {
			this.setState({pokemon});
			this.getSprite(pokemon);
		});
	}

	getSprite(pokemon) {
		$.get(`http://pokeapi.co/${pokemon.sprites[0].resource_uri}`).done(sprite => {
			this.setState({sprite: `http://pokeapi.co/${sprite.image}`});
		});
	}

	render() {
		return (
			<PokemonStats pokemon={this.state.pokemon} sprite={this.state.sprite} />
		);
	}
}

class CardsBinder extends React.Component {
	render() {
		let cards = this.props.pokemonIds.map(pokemonId => {
			return <PokemonCard key={pokemonId} pokemonId={pokemonId} />;
		});
		return (
			<div className="container">
				{cards}
			</div>
		);
	}
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.catchPokemon = this.catchPokemon.bind(this);
		this.state = {pokemonIds: [1, 4, 7]};
	}

	catchPokemon() {
		let pokemon = pokedex().slice(0, 8);
		this.setState({pokemonIds: pokemon});
	}

	render() {
		return (
			<div>
				<div>
					<div className="button">
						<button onClick={this.catchPokemon}>Gotta Catch Em All</button>
					</div>
					<CardsBinder pokemonIds={this.state.pokemonIds} />
				</div>
			</div>
		);
	}
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pokemon: []};
		this.getPokemon();
	}

	getPokemon() {
		$.get('http://pokeapi.co/api/v2/pokedex/2').done(pokemon => {
			this.setState({pokemon: pokemon.pokemon_entries});
		});
	}

	render() {
		return (
			<div>
				<PokemonName pokemon={this.state.pokemon} />
			</div>
		);
	}
}

class PokemonName extends React.Component {
	render() {
		let pokemon = this.props.pokemon.map(pokemonId => {
			return <Pokemon key={pokemonId.entry_number} pokemon={pokemonId} />
		});

		return (
			<div className="pokedex">
				{pokemon}
			</div>
		);
	}
}

class Pokemon extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		if (pokemon.entry_number < 10) {
			pokemon.formatted_number = '00' + pokemon.entry_number;
		} else if (pokemon.entry_number < 100) {
			pokemon.formatted_number = '0' + pokemon.entry_number;
		} else {
			pokemon.formatted_number = pokemon.entry_number;
		}

		return (
			<div className="pokemon">
				<h2>{capitalize(pokemon.pokemon_species.name)}</h2>
			</div>
		);
	}
}


class About extends React.Component {
	render() {
		return (
			<div>
				<div className="me">
					<div className="pic">
						<a href="http://thomasvaeth.com" target="_blank"><img src="images/me-bw.jpeg" /></a>
					</div>
					<h2>I am Thomas Vaeth and I am a web developer in Seattle.</h2>
					<p>Why did I sell all of my Pokémon cards on eBay?</p>
					<div className="devicon">
						<p>And this is everything I used to build this:</p>
						<i className="devicon-react-original" title="React"></i>
						<i className="devicon-html5-plain" title="HTML"></i>
						<i className="devicon-sass-original" title="Sass"></i>
						<i className="devicon-css3-plain" title="CSS"></i>
						<i className="devicon-javascript-plain" title="JavaScript"></i>
						<i className="devicon-jquery-plain" title="jQuery"></i>
						<i className="devicon-gulp-plain" title="Gulp"></i>
						<i className="devicon-github-plain" title="GitHub"></i>
					</div>
				</div>
			</div>
		);
	}
}

class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<h1>PoKéMoN ReAcT</h1>
				<div className="link">
					<Link to="/">Home</Link>
					<Link to="/pokedex">Pokedex</Link>
					<Link to="/about">About</Link>
				</div>
				{this.props.children}
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={Nav}>
						<IndexRoute component={HomePage} />
						<Route path="pokedex" component={Pokedex} />
						<Route path="about" component={About} />
					</Route>
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('container'));