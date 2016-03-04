import React from 'react';

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

export default Pokemon;
