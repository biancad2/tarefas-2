const connection = require('../database/connection');

var intervalo;
module.exports = {
    async index(request, response) {

        const tarefas = await connection('tarefas-com-hr')
            .select('*');
        return response.json(tarefas);
    },
   
    async hora(request, response) {
        const { id } = request.params;
        const tarefas = await connection('tarefas-com-hr')
            .select('segundos')
            .where('id', id);
        
            /*const timeoutObj = setTimeout(() => {
                console.log('timeout beyond time');
              }, 1500);*/

        return response.json(tarefas);
    },
    async create(request, response) {
        const { title, description, start, pause, end } = request.body;
    
        const [id] = await connection('tarefas-com-hr').insert({
            title,
            description,
            start,
            end,
            pause,
            dias: 0,
            horas: 0,
            minutos: 0,
            segundos: 0
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const tarefa = await connection('tarefas-com-hr')
            .where('id', id)
            .first();

        connection('tarefas-com-hr').where('id', id).delete();
    },

    async comecar(request, response) {
        const { id } = request.params;
        console.log({id})
         intervalo = setInterval(() => { 
            const tarefas = connection('tarefas-com-hr')
            .where('id', id)
            .update(request.body)
            .then(function(data){
            response.send(data);
        });
        request.body.segundos++;
        if (request.body.horas == 24) { request.body.dias++; request.body.horas=0; request.body.segundos = 0; request.body.minutos = 0}
        if (request.body.minutos == 60) { request.body.horas++; request.body.segundos = 0; request.body.minutos = 0}  
        if (request.body.segundos == 60) { request.body.minutos++; request.body.segundos = 0; }  
          }, 1000)
        
        

        return response.json();
    },

    parar(request, response){
        const { id } = request.params;
        clearInterval(intervalo)
    
            const tarefas = connection('tarefas-com-hr')
            .where('id', id)
            .update(request.body)
            .then(function(data){
            response.send(data);
        });
        return response.json();
    },
   
    
}