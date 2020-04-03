import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import NewTask from './pages/NewTask';
import Tarefas from './pages/Tarefas-2';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tarefas}/>
                <Route path="/tarefas/new" component={NewTask}/>
                
            </Switch>
        </BrowserRouter>

    )
}