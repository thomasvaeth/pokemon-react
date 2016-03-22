import React from 'react';
import CardsBinder from './CardsBinder';

const shuffle = arr => {
	let m = arr.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}

const pokedex = () => {
	let idArr = [];
	for (let i = 1; i <= 151; i++) {
		idArr.push(i);
	}
	return shuffle(idArr);
}

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.catchPokemon = this.catchPokemon.bind(this);
		this.state = {pokemonIds: [1, 4, 7]};
	}

	catchPokemon() {
		let pokemon = pokedex().slice(0, 8);
		this.setState({pokemonIds: pokemon});
	}

	render() {
		return (
			<div>
				<div>
					<div className="button">
						<button onClick={this.catchPokemon}>Gotta Catch Em All</button>
					</div>
					<CardsBinder pokemonIds={this.state.pokemonIds} />
				</div>
			</div>
		);
	}
}
