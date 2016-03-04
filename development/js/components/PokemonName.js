import React from 'react';
import Pokemon from './Pokemon';

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

export default PokemonName;
