import React from 'react';
import Pokemon from './Pokemon';

export default class PokemonName extends React.Component {
	render() {
		const pokemon = this.props.pokemon.map(pokemonId => {
			return <Pokemon key={pokemonId.national_id} pokemon={pokemonId} />;
		});

		return (
			<div className="pokedex">
				{pokemon}
			</div>
		);
	}
}
