import React from 'react';
import $ from 'jquery';
import PokemonStats from './PokemonStats';

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

export default PokemonCard;
