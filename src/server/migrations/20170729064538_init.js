exports.up = function(knex) {
  return knex.schema.createTable("wpt_reports", table => {
    table.string("test_id").primary().notNullable();
    table.string("status").notNullable();
    table.string("url").notNullable();
    table.string("summary_url").notNullable();
    table.string("location").notNullable();
    table.string("connectivity").notNullable();
    table.string("browser_name").notNullable();
    table.string("browser_version").notNullable();

    table.integer("fv_ttfb").notNullable();
    table.integer("fv_first_paint").notNullable();
    table.integer("fv_start_render").notNullable();
    table.integer("fv_last_visual_change").notNullable();
    table.integer("fv_visual_complete").notNullable();
    table.integer("fv_load_time").notNullable();
    table.integer("fv_fully_loaded").notNullable();
    table.integer("fv_speed_index").notNullable();
    table.integer("fv_requests_made").notNullable();
    table.integer("fv_bytes_downloaded").notNullable();
    table.json("fv_domain_breakdown").notNullable();
    table.json("fv_content_breakdown").notNullable();

    table.integer("rv_ttfb").notNullable();
    table.integer("rv_first_paint").notNullable();
    table.integer("rv_start_render").notNullable();
    table.integer("rv_last_visual_change").notNullable();
    table.integer("rv_visual_complete").notNullable();
    table.integer("rv_load_time").notNullable();
    table.integer("rv_fully_loaded").notNullable();
    table.integer("rv_speed_index").notNullable();
    table.integer("rv_requests_made").notNullable();
    table.integer("rv_bytes_downloaded").notNullable();
    table.json("rv_domain_breakdown").notNullable();
    table.json("rv_content_breakdown").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("wpt_reports");
};
