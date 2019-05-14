import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router-dom';

class App extends Component {

  render() {    
    return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

        <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="/"> Equipe GT</a>
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/eventos" className="pure-menu-link">Eventos</Link></li>                      
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Comissários</Link></li>                      
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Relatório</Link></li>                      
              </ul>
          </div>
        </div>

        <div id="main">
        {this.props.children}
        </div>            


      </div>     
    );
  }
}

export default App;
