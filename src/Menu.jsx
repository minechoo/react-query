import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
	return (
		<nav>
			<h1>
				<Link to='/'>Main</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<Link to='/name'>Name</Link>
				</li>
				<li>
					<Link to='/address'>Address</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
