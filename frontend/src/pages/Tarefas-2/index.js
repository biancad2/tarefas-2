import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import logoImg from '../../assets/Nova.png';

import api from '../../services/api';
import './styles.css'

export default class Tarefas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tarefas: [],
            itensFinalizados: [],
            itensEmAndamento: [],
    
        };
        this.iniciar = this.iniciar.bind(this)
        this.pause = this.pause.bind(this)
    }

    componentDidMount() {
    
        setInterval(() => {
            api.get('/tarefas2/')
                .then(response => {
                    this.setState({
                        tarefas: response.data,
                    });
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
               

            //Itens finalizados
            let itensFinalizados = this.state.tarefas;
            itensFinalizados = itensFinalizados.filter((item) => {
                return item.end == "true"
            });
            this.setState({ itensFinalizados: itensFinalizados });

            //Itens em andamento
            let itensEmAndamento = this.state.tarefas;
            itensEmAndamento = itensEmAndamento.filter((item) => {
                return item.end !== "true"
            });
            this.setState({ itensEmAndamento: itensEmAndamento });

        }, 1000);


    }
    

    iniciar(id, minutos, segundos) {
        const obj = {
            start: "true",
            end: "false",
            pause: "false",
            segundos: segundos,
            minutos: minutos
        }

        api.put('/tarefas2/' + id, obj)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            });

    }
    pause(id) {
        const obj = {
            start: "false",
            pause: "true",
            end: "false"
        }

        api.put('/tarefas2-parar/' + id, obj)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            });
    }
    parar(id) {
        const obj = {
            start: "false",
            pause: "false",
            end: "true"
        }

        api.put('/tarefas2-parar/' + id, obj)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            });
    }
   
    render() {
        return (
            <div className="Tarefa-container">
                <header>
                    <img src={logoImg} alt="Be the hero" />
                    <Link className="button" to='/tarefas/new'>Cadastrar nova tarefa</Link>

                </header>
                
                <h2>Tarefas em andamento</h2>

                <div className="Tarefas-finalizadas">  
                    {this.state.itensEmAndamento.map(tarefa => (
                        <div key={tarefa.id} className="listagem">
                            <strong>{tarefa.title}</strong>
                            <p className="descricao">{tarefa.description}</p>
                            <p className="hora">{tarefa.dias} dias {tarefa.horas}h {tarefa.minutos}m {tarefa.segundos}s</p>
                            <button type="button" className="remover">
                                <FiTrash2 size={20} color="#A8A8B3" />
                            </button>
                            <button onClick={() => this.iniciar(tarefa.id, tarefa.minutos, tarefa.segundos)} className="button start">
                                <FiPlay size={20} color="#FFF" />
                            </button>
                            <button onClick={() => this.pause(tarefa.id)} className="button pause">
                                <FiPause size={20} color="#FFF" />
                            </button>
                            <button onClick={() => this.parar(tarefa.id)} className="button stop">
                                <FiSquare size={20} color="#FFF" />
                            </button>
                        </div>
                    ))}
                </div>

                <h2>Tarefas finalizadas</h2>

                <div className="Tarefas-finalizadas">
                    {this.state.itensFinalizados.map(tarefa => (
                        <div key={tarefa.id} className="listagem">
                            <strong>{tarefa.title}</strong>
                            <p className="descricao">{tarefa.description}</p>
                            <p className="hora">{tarefa.dias} dias {tarefa.horas}h {tarefa.minutos}m {tarefa.segundos}s</p>
            
                            <button onClick={() => this.iniciar(tarefa.id, tarefa.minutos, tarefa.segundos)} className="button start">
                                <FiPlay size={20} color="#FFF" />
                            </button>
                            <button onClick={() => this.pause(tarefa.id)} className="button pause">
                                <FiPause size={20} color="#FFF" />
                            </button>
                            <button onClick={() => this.parar(tarefa.id)} className="button stop">
                                <FiSquare size={20} color="#FFF" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}