import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import Home from './Home';
import Evento,{EventoBox} from './Evento';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    
    <BrowserRouter>
        <Switch>
        <App>
            <Route exact path="/"  component={Home} />
            <Route path="/autor" component={AutorBox} />
            <Route exact path="/eventos" component={Evento} />
            <Route exact path="/eventos/cadastro" component={EventoBox} />
            </App>
        </Switch>
    </BrowserRouter>
    
, document.getElementById('root'));
