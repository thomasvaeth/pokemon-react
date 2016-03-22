import React from 'react';
import $ from 'jquery';
import PokemonName from './PokemonName';

export default class Pokedex extends React.Component {
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
