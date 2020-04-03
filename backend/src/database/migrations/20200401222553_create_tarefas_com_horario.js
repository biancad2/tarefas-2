
exports.up = function(knex) {
    return knex.schema.createTable('tarefas-com-hr', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('start').notNullable();
        table.string('pause').notNullable();
        table.string('end').notNullable();

        table.int('dias');
        table.int('horas');
        table.int('minutos');
        table.int('segundos');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas-com-hr');
};
