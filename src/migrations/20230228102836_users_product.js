/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_products',(table)=>{
    table.increments('id');
    table.string('p_name',100);
    table.string('price',10);
    table.tinyint('status',4).defaultTo('1').comment('1:available, 0:not-available');
    table.timestamps();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropSchema('user_products');
};
