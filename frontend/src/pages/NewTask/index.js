import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/Nova.png';
import './styles.css';
import api from '../../services/api'

export default function NewTask(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const history = useHistory();
    async function handleNewTask(e){
        e.preventDefault();
        const data = {
            title, 
            description,
            start:"false",
            end:"false",
            pause:"false",
    
        };
        
        try {
            await api.post('/tarefas2', data);
            console.log(data)
            history.push('/');
        } catch (error) {
            alert("Erro ao cadastrar tarefa, tente novamente");
        }
        console.log(data)
    }

    
    
    return (
        <div className="New-task-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero" className="logo"/>
                <h1>Cadastrar nova tarefa</h1>
                <p>Descreva a tarefa detalhadamente.</p>
                <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para as tarefas
                    </Link>
            </section>
            <form onSubmit={handleNewTask}>
                <input 
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
               

                <button className="button">
                    Salvar
                </button>

            </form>
        </div>
    </div>
    );
}