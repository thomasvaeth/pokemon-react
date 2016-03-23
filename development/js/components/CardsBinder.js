import React from 'react';
import PokemonCard from './PokemonCard';

export default class CardsBinder extends React.Component {
	render() {
		const cards = this.props.pokemonIds.map(pokemonId => {
			return <PokemonCard key={pokemonId} pokemonId={pokemonId} />;
		});
		return (
			<div className="container">
				{cards}
			</div>
		);
	}
}
