import React from 'react';
import PokemonName from './PokemonName';

export default class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pokemon: [] };
		this.getPokemon();
	}

	getPokemon() {
		fetch('/api/pokemon').then(res => { 
			return res.json();
		}).then(pokemon => { 
			this.setState({ pokemon });
		}).catch(e => {
			console.log('Your Gameboy is out of batteries.');
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
