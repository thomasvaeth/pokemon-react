import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<div className="header">
					<Link to="/"><h1>PoKéMoN ReAcT</h1></Link>
				</div>
				<div className="link">
					<Link to="/">Home</Link>
					<Link to="/pokedex">Pokédex</Link>
					<Link to="/about">About</Link>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default Nav;
