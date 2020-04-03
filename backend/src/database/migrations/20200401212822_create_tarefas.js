
exports.up = function(knex) {
    return knex.schema.createTable('tarefas', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('start').notNullable();
        table.string('pause').notNullable();
        table.string('end').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas');
};
