import $ from "jquery";
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';
import DatePicker from 'react-datepicker';

class FormularioEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {nome: '', data: '', local: ''};
    this.setNome = this.setNome.bind(this);
    this.setData = this.setData.bind(this);
    this.setLocal = this.setLocal.bind(this);   
    this.handleLivroSubmit = this.handleLivroSubmit.bind(this);
  }
  
  setNome(e) {
    this.setState({titulo: e.target.value});
  }

  setData(e) {
    this.setState({preco: e.target.value});
  }

  setLocal(e) {
    this.setState({autorId: e.target.value});
  }
  
  
  handleLivroSubmit(e) {
    e.preventDefault();
    var nome = this.state.nome.trim();
    var data = this.state.data.trim();
    var local = this.state.local;

    $.ajax({
      url: 'http://localhost:8080/api/eventos',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({nome:nome,data:data,local:local}),
      success: function(novaListagem) {
          PubSub.publish( 'atualiza-lista-eventos',novaListagem);            
          this.setState({nome:'',data:'',local:''});
      },
      error: function(resposta){
        if(resposta.status === 400){
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }            
    });  
    
    this.setState({nome: '', data: '', local: ''});
  }
  
  render() {
    var eventos = this.props.eventos.map(function(evento){
      return <option key={evento.id} value={evento.id}>{evento.nome}</option>;
    });
    return (
      <div>
        <form className="pure-form pure-form-aligned" onSubmit={this.handleLivroSubmit}>
        <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
        />
        </form>             
      </div>
    );
  }
} 

export class EventoBox extends Component {
  
  render() {
    var eventos = this.props.lista.map(function(evento){
      return(
          <tr key={evento.nome}>
            <td>{evento.nome}</td>
            <td>{evento.evento.local}</td>
            <td>{evento.data}</td>
          </tr>
        );
      });
    return(
      <table className="pure-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Local</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {eventos}
        </tbody>
      </table>
    );
  }
}

export default class LivroAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {lista : [],eventos:[]};
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:8080/api/eventos",
      dataType: 'json',
      success: function(data) {
        this.setState({lista: data});
      }.bind(this)
    });
    
    $.ajax({
      url: "http://localhost:8080/api/autores",
      dataType: 'json',
      success: function(data) {
        this.setState({eventos: data});
      }.bind(this)
    });

    PubSub.subscribe('atualiza-lista-eventos', function(topicName,lista){
      this.setState({lista:lista});
    }.bind(this));    
  }


  render() {
    return(
      <div>
        <div className="header">
          <h1>Cadastro de Eventos</h1>
        </div>
        <div className="content" id="content">
          <FormularioEvento eventos={this.state.eventos}/>
          <EventoBox lista={this.state.lista}/>
        </div>
      </div>
    );
  }
} 