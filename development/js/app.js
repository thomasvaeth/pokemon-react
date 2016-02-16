import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link, browserHistory, IndexRoute, Router, Route} from 'react-router';

const shuffle = arr => {
	let m = arr.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}

const pokedex = () => {
	let idArr = [];
	for (let i = 1; i <= 151; i++) {
		idArr.push(i);
	}
	return shuffle(idArr);
}

const convertWeight = weight => {
	if (!isNaN(weight)) return (weight * 0.220462).toFixed(0);
}

const convertHeight = height => {
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
					<img src={pokemon.sprite} />
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
		$.get(`/api/pokemon/${this.props.pokemonId}`).done(pokemon => {
			this.setState({pokemon});
		});
	}

	render() {
		return (
			<PokemonStats pokemon={this.state.pokemon} />
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

class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pokemon: []};
		this.getPokemon();
	}

	getPokemon() {
		$.get('/api/pokemon').done(pokemon => {
			this.setState({pokemon});
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
			return <Pokemon key={pokemonId.national_id} pokemon={pokemonId} />
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
		if (pokemon.national_id < 10) {
			pokemon.formatted_number = '00' + pokemon.national_id;
		} else if (pokemon.national_id < 100) {
			pokemon.formatted_number = '0' + pokemon.national_id;
		} else {
			pokemon.formatted_number = pokemon.national_id;
		}

		return (
			<div>
				<a href={'http://www.pokemon.com/us/pokedex/' + pokemon.name} target="_blank">
					<div className="pokemon">
						<h2>{pokemon.name}</h2>
					</div>
				</a>
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
						<i className="devicon-react-original" title="React"></i>
						<i className="devicon-nodejs-plain" title="Node.js"></i>
						<i class="devicon-mongodb-plain" title="MongoDB"></i>
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
				<div className="header">
					<Link to="/"><h1>PoKéMoN ReAcT</h1></Link>
				</div>
				<div className="link">
					<Link to="/">Home</Link>
					<Link to="/pokedex">Pokédex</Link>
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
