exports.up = function(knex) {
  return knex.schema.table("wpt_reports", table => {
    table.string("json_url").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("wpt_reports", table => {
    table.dropColumn("json_url");
  });
};
