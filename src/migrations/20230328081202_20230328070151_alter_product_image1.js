/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.alterTable('product_images',(table)=>{
        table.renameColumn('iamge_path','image_path');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('product_images',(table)=>{
        table.renameColumn('image_path','iamge_path');
    })
};
