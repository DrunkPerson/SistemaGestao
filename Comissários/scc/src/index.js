import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import Home from './Home';
import Livro from './Livro';
import './index.css';
import {Router,Route} from 'react-router';
import history from './history'

ReactDOM.render(
  (
  <Router history={history}>
  	<Route path="/" component={App}>
        <Route exact path="/" component={Home}/>
	  	<Route path="/autor" component={AutorBox}/>
	  	<Route path="/livro" component={Livro}/>
  	</Route>
  </Router>),
  document.getElementById('root')
);
