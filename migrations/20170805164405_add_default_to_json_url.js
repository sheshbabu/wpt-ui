exports.up = function(knex) {
  return knex.schema.alterTable("wpt_reports", table => {
    table.string("json_url").notNullable().defaultTo("").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("wpt_reports", table => {
    table.string("json_url").notNullable().alter();
  });
};
