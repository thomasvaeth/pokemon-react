const {browserHistory, Router, Route, Link} = window.ReactRouter;

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
	return (weight * 0.220462).toFixed(0);
}

function convertHeight(height) {
	let converted = (height * 0.328084);
	let feet = Math.floor(converted);
	let inches = ((converted - feet) * 3.93701).toFixed(0);
	return feet + "'" + inches + '"';
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

class PokemonStats extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let sprite = this.props.sprite;
		let converted_weight = convertWeight(pokemon.weight);
		if (pokemon.national_id < 10) {
			pokemon.formated_id = '00' + pokemon.national_id
		} else if (pokemon.national_id < 100) {
			pokemon.formated_id = '0' + pokemon.national_id
		} else {
			pokemon.formated_id = pokemon.national_id
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
						<h3>{pokemon.formated_id}</h3>
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

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.catchPokemon = this.catchPokemon.bind(this);
		let pokemon = pokedex().slice(0, 6);
		this.state = {pokemonIds: [1, 4, 7]};
	}

	catchPokemon() {
		let pokemon = pokedex().slice(0, 10);
		this.setState({pokemonIds: pokemon});
	}

	render() {
		return (
			<div>
				<div>
					<button onClick={this.catchPokemon}>Gotta Catch Em All</button>
					<CardsBinder pokemonIds={this.state.pokemonIds} />
				</div>
			</div>
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

class Nav extends React.Component {
	render() {
		return (
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>
		);
	}
}

class About extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<h1>Ash Ketchum</h1>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={HomePage} />
					<Route path="about" component={About} />
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('container'));
