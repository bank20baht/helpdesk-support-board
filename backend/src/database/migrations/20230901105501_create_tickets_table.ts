import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tickets', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('detail').notNullable();
    table.string('room').notNullable();
    table.string('status').defaultTo('pending');
    //relational
    table.integer('userId').references('id').inTable('users');
    //timestamp
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tickets');
}
