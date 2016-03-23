import React from 'react';

const convertWeight = weight => {
	if (!isNaN(weight)) return (weight * 0.220462).toFixed(0);
};

const convertHeight = height => {
	if (!isNaN(height)) {
		const converted = (height * 0.328084);
		const feet = Math.floor(converted);
		const inches = ((converted - feet) * 3.93701).toFixed(0);
		return feet + '\'' + inches + '"';
	}
};

export default class PokemonStats extends React.Component {
	render() {
		const pokemon = this.props.pokemon;
		const converted_weight = convertWeight(pokemon.weight);
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
