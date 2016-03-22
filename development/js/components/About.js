import React from 'react';

export default class About extends React.Component {
	render() {
		return (
			<div>
				<div className="me">
					<div className="pic">
						<a href="http://thomasvaeth.com" target="_blank"><img src="images/me-bw.jpeg" /></a>
					</div>
					<h2>I am Thomas Vaeth and I am a web developer in Seattle.</h2>
					<p>Why did I sell all of my Pokémon cards on eBay?</p>
					<div className="devicon">
						<i className="devicon-react-original" title="React"></i>
						<i className="devicon-nodejs-plain" title="Node.js"></i>
						<i className="devicon-html5-plain" title="HTML"></i>
						<i className="devicon-sass-original" title="Sass"></i>
						<i className="devicon-javascript-plain" title="JavaScript"></i>
						<i className="devicon-jquery-plain" title="jQuery"></i>
						<i className="devicon-mongodb-plain" title="MongoDB"></i>
						<i className="devicon-gulp-plain" title="Gulp"></i>
					</div>
				</div>
			</div>
		);
	}
}
