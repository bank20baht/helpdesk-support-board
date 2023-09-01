import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tickets', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.string('title').notNullable();
    table.string('detail').notNullable().unique();
    table.string('room').notNullable();
    table.string('status').defaultTo('pending');

    //relational
    table.uuid('userId').references('id').inTable('users');
    //timestamp
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('last_updated').defaultTo(knex.fn.now()).notNullable();
    // Indexes for performance optimization
    table.index('created_at');
    table.index('last_updated');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tickets');
}
