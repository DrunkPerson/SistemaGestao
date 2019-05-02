import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UsuarioBox from './Usuario';
import Home from './Home';
import './index.css';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';

ReactDOM.render((
        <Router>
            <App>
                    <Switch>            
                        <Route exact path="/" component={Home}/>
                        <Route path="/Usuario" component={UsuarioBox}/>
                        <Route path="/livro"/>                
                    </Switch>            
            </App>
        </Router>

), document.getElementById('root'));