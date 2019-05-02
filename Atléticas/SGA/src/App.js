import React, { Component } from 'react';
import './css/side-menu.css';
import './css/pure-min.css';
import logo from './img/A5LOGO.png';
import { Link } from 'react-router-dom'

class App extends Component {

	render() {
		return (

			<div id="layout">

				<div id="menu">
					<div className="pure-menu">
						<Link className="pure-menu-heading" to="http://localhost:3000">ASINCO</Link>
							<ul className="pure-menu-list">
								<li className="pure-menu-item"><Link className="pure-menu-link" to="/usuario">Cadastrar</Link></li>
								<li className="pure-menu-item"><Link className="pure-menu-link" to="/rh">Recursos Humanos</Link></li>
								<ul className="pure-menu-list">
									<li><Link className="pure-menu-link" to="/listar">Listar</Link></li>
									<li><Link className="pure-menu-link" to="/alocar">Alocar</Link></li>
									<li><Link className="pure-menu-link" to="/associacao">Associacao</Link></li>
								</ul>
								<ul className="pure-menu-list">
								<li className="pure-menu-item"><Link className="pure-menu-link" to="/financeiro">Financeiro</Link></li>
								</ul>
								<li className="pure-menu-item"><Link className="pure-menu-link" to="/esportes">Esportes</Link></li>
								<li className="pure-menu-item"><Link className="pure-menu-link" to="/esportes">Lojinha</Link></li>
							</ul>
					</div>
				</div>

				<div id="main">
					<div className="header">
						<img src={logo} alt="Logo" height="250px" width="350px" />
						<h1>Bem vindo à ASINCO</h1>
					</div>
					<div className="content" id="content">
						
					</div>
				</div>
			</div>
		);
	}
}

export default App;
