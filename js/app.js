'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React-Router
var _window$ReactRouter = window.ReactRouter;
var browserHistory = _window$ReactRouter.browserHistory;
var Router = _window$ReactRouter.Router;
var Route = _window$ReactRouter.Route;
var IndexRoute = _window$ReactRouter.IndexRoute;
var Link = _window$ReactRouter.Link;

// Fisher–Yates shuffle algorithm

function shuffle(arr) {
	var m = arr.length,
	    t,
	    i;
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
	var idArr = [];
	for (var i = 1; i <= 151; i++) {
		idArr.push(i);
	}
	return shuffle(idArr);
}

function convertWeight(weight) {
	if (!isNaN(weight)) return (weight * 0.220462).toFixed(0);
}

function convertHeight(height) {
	if (!isNaN(height)) {
		var converted = height * 0.328084;
		var feet = Math.floor(converted);
		var inches = ((converted - feet) * 3.93701).toFixed(0);
		return feet + "'" + inches + '"';
	}
}

var PokemonStats = function (_React$Component) {
	_inherits(PokemonStats, _React$Component);

	function PokemonStats() {
		_classCallCheck(this, PokemonStats);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PokemonStats).apply(this, arguments));
	}

	_createClass(PokemonStats, [{
		key: 'render',
		value: function render() {
			var pokemon = this.props.pokemon;
			var sprite = this.props.sprite;
			var converted_weight = convertWeight(pokemon.weight);
			if (pokemon.national_id < 10) {
				pokemon.formatted_id = '00' + pokemon.national_id;
			} else if (pokemon.national_id < 100) {
				pokemon.formatted_id = '0' + pokemon.national_id;
			} else {
				pokemon.formatted_id = pokemon.national_id;
			}

			return React.createElement(
				'div',
				{ className: 'card' },
				React.createElement(
					'div',
					{ className: 'name' },
					React.createElement(
						'h2',
						null,
						pokemon.name
					),
					React.createElement(
						'p',
						null,
						pokemon.hp,
						'HP'
					)
				),
				React.createElement(
					'div',
					{ className: 'image' },
					React.createElement('img', { src: sprite })
				),
				React.createElement(
					'div',
					{ className: 'stats' },
					'Length: ',
					convertHeight(pokemon.height),
					', Weight: ',
					convertWeight(pokemon.weight),
					' lbs.'
				),
				React.createElement(
					'div',
					{ className: 'about' },
					React.createElement(
						'div',
						{ className: 'id' },
						React.createElement(
							'h3',
							null,
							pokemon.formatted_id,
							'/151'
						)
					),
					React.createElement(
						'div',
						{ className: 'abilities' },
						React.createElement(
							'p',
							null,
							'Attack: ',
							pokemon.attack
						),
						React.createElement(
							'p',
							null,
							'Defense: ',
							pokemon.defense
						),
						React.createElement(
							'p',
							null,
							'Speed: ',
							pokemon.speed
						)
					)
				)
			);
		}
	}]);

	return PokemonStats;
}(React.Component);

var PokemonCard = function (_React$Component2) {
	_inherits(PokemonCard, _React$Component2);

	function PokemonCard(props) {
		_classCallCheck(this, PokemonCard);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PokemonCard).call(this, props));

		_this2.state = { pokemon: {} };
		_this2.getPokemon();
		return _this2;
	}

	_createClass(PokemonCard, [{
		key: 'getPokemon',
		value: function getPokemon() {
			var _this3 = this;

			$.get('http://pokeapi.co/api/v1/pokemon/' + this.props.pokemonId).done(function (pokemon) {
				_this3.setState({ pokemon: pokemon });
				_this3.getSprite(pokemon);
			});
		}
	}, {
		key: 'getSprite',
		value: function getSprite(pokemon) {
			var _this4 = this;

			$.get('http://pokeapi.co/' + pokemon.sprites[0].resource_uri).done(function (sprite) {
				_this4.setState({ sprite: 'http://pokeapi.co/' + sprite.image });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(PokemonStats, { pokemon: this.state.pokemon, sprite: this.state.sprite });
		}
	}]);

	return PokemonCard;
}(React.Component);

var CardsBinder = function (_React$Component3) {
	_inherits(CardsBinder, _React$Component3);

	function CardsBinder() {
		_classCallCheck(this, CardsBinder);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CardsBinder).apply(this, arguments));
	}

	_createClass(CardsBinder, [{
		key: 'render',
		value: function render() {
			var cards = this.props.pokemonIds.map(function (pokemonId) {
				return React.createElement(PokemonCard, { key: pokemonId, pokemonId: pokemonId });
			});
			return React.createElement(
				'div',
				{ className: 'container' },
				cards
			);
		}
	}]);

	return CardsBinder;
}(React.Component);

var HomePage = function (_React$Component4) {
	_inherits(HomePage, _React$Component4);

	function HomePage(props) {
		_classCallCheck(this, HomePage);

		var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(HomePage).call(this, props));

		_this6.catchPokemon = _this6.catchPokemon.bind(_this6);
		_this6.state = { pokemonIds: [1, 4, 7] };
		return _this6;
	}

	_createClass(HomePage, [{
		key: 'catchPokemon',
		value: function catchPokemon() {
			var pokemon = pokedex().slice(0, 8);
			this.setState({ pokemonIds: pokemon });
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'button' },
						React.createElement(
							'button',
							{ onClick: this.catchPokemon },
							'Gotta Catch Em All'
						)
					),
					React.createElement(CardsBinder, { pokemonIds: this.state.pokemonIds })
				)
			);
		}
	}]);

	return HomePage;
}(React.Component);

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var Pokedex = function (_React$Component5) {
	_inherits(Pokedex, _React$Component5);

	function Pokedex(props) {
		_classCallCheck(this, Pokedex);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pokedex).call(this, props));

		_this7.state = { pokemon: [] };
		_this7.getPokemon();
		return _this7;
	}

	_createClass(Pokedex, [{
		key: 'getPokemon',
		value: function getPokemon() {
			var _this8 = this;

			$.get('http://pokeapi.co/api/v2/pokedex/2').done(function (pokemon) {
				_this8.setState({ pokemon: pokemon.pokemon_entries });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(PokemonName, { pokemon: this.state.pokemon })
			);
		}
	}]);

	return Pokedex;
}(React.Component);

var PokemonName = function (_React$Component6) {
	_inherits(PokemonName, _React$Component6);

	function PokemonName() {
		_classCallCheck(this, PokemonName);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PokemonName).apply(this, arguments));
	}

	_createClass(PokemonName, [{
		key: 'render',
		value: function render() {
			var pokemon = this.props.pokemon.map(function (pokemonId) {
				return React.createElement(Pokemon, { key: pokemonId.entry_number, pokemon: pokemonId });
			});

			return React.createElement(
				'div',
				{ className: 'pokedex' },
				pokemon
			);
		}
	}]);

	return PokemonName;
}(React.Component);

var Pokemon = function (_React$Component7) {
	_inherits(Pokemon, _React$Component7);

	function Pokemon() {
		_classCallCheck(this, Pokemon);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Pokemon).apply(this, arguments));
	}

	_createClass(Pokemon, [{
		key: 'render',
		value: function render() {
			var pokemon = this.props.pokemon;
			if (pokemon.entry_number < 10) {
				pokemon.formatted_number = '00' + pokemon.entry_number;
			} else if (pokemon.entry_number < 100) {
				pokemon.formatted_number = '0' + pokemon.entry_number;
			} else {
				pokemon.formatted_number = pokemon.entry_number;
			}

			return React.createElement(
				'div',
				{ className: 'pokemon' },
				React.createElement(
					'h2',
					null,
					capitalize(pokemon.pokemon_species.name)
				)
			);
		}
	}]);

	return Pokemon;
}(React.Component);

var About = function (_React$Component8) {
	_inherits(About, _React$Component8);

	function About() {
		_classCallCheck(this, About);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
	}

	_createClass(About, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'me' },
					React.createElement(
						'div',
						{ className: 'pic' },
						React.createElement(
							'a',
							{ href: 'http://thomasvaeth.com', target: '_blank' },
							React.createElement('img', { src: 'images/me-bw.jpeg' })
						)
					),
					React.createElement(
						'h2',
						null,
						'I am Thomas Vaeth and I am a web developer in Seattle.'
					),
					React.createElement(
						'p',
						null,
						'Why did I sell all of my Pokémon cards on eBay?'
					),
					React.createElement(
						'div',
						{ className: 'devicon' },
						React.createElement(
							'p',
							null,
							'And this is everything I used to build this:'
						),
						React.createElement('i', { className: 'devicon-react-original', title: 'React' }),
						React.createElement('i', { className: 'devicon-html5-plain', title: 'HTML' }),
						React.createElement('i', { className: 'devicon-sass-original', title: 'Sass' }),
						React.createElement('i', { className: 'devicon-css3-plain', title: 'CSS' }),
						React.createElement('i', { className: 'devicon-javascript-plain', title: 'JavaScript' }),
						React.createElement('i', { className: 'devicon-jquery-plain', title: 'jQuery' }),
						React.createElement('i', { className: 'devicon-gulp-plain', title: 'Gulp' }),
						React.createElement('i', { className: 'devicon-github-plain', title: 'GitHub' })
					)
				)
			);
		}
	}]);

	return About;
}(React.Component);

var Nav = function (_React$Component9) {
	_inherits(Nav, _React$Component9);

	function Nav() {
		_classCallCheck(this, Nav);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).apply(this, arguments));
	}

	_createClass(Nav, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'nav' },
				React.createElement(
					'h1',
					null,
					'PoKéMoN ReAcT'
				),
				React.createElement(
					'div',
					{ className: 'link' },
					React.createElement(
						Link,
						{ to: '/' },
						'Home'
					),
					React.createElement(
						Link,
						{ to: '/pokedex' },
						'Pokedex'
					),
					React.createElement(
						Link,
						{ to: '/about' },
						'About'
					)
				),
				this.props.children
			);
		}
	}]);

	return Nav;
}(React.Component);

var App = function (_React$Component10) {
	_inherits(App, _React$Component10);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					Router,
					{ history: browserHistory },
					React.createElement(
						Route,
						{ path: '/', component: Nav },
						React.createElement(IndexRoute, { component: HomePage }),
						React.createElement(Route, { path: 'pokedex', component: Pokedex }),
						React.createElement(Route, { path: 'about', component: About })
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));