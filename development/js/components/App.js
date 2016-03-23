import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import HomePage from './HomePage';
import Pokedex from './Pokedex';
import About from './About';
import Nav from './Nav';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={Nav}>
						<IndexRoute component={HomePage} />
						<Route path="pokedex" component={Pokedex} />
						<Route path="about" component={About} />
					</Route>
				</Router>
			</div>
		);
	}
}

