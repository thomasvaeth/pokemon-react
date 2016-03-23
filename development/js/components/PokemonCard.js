import React from 'react';
import PokemonStats from './PokemonStats';

export default class PokemonCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pokemon: {} };
		this.getPokemon();
	}

	getPokemon() {
		fetch(`/api/pokemon/${this.props.pokemonId}`).then(res => { 
			return res.json();
		}).then(pokemon => { 
			this.setState({ pokemon });
		}).catch(e => {
			console.log('Your Gameboy is out of batteries.');
		});
	}

	render() {
		return (
			<PokemonStats pokemon={this.state.pokemon} />
		);
	}
}
