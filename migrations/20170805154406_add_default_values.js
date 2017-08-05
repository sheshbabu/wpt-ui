exports.up = function(knex) {
  return knex.schema.alterTable("wpt_reports", table => {
    table.string("url").notNullable().defaultTo("").alter();
    table.string("summary_url").notNullable().defaultTo("").alter();
    table.string("location").notNullable().defaultTo("").alter();
    table.string("connectivity").notNullable().defaultTo("").alter();
    table.string("browser_name").notNullable().defaultTo("").alter();
    table.string("browser_version").notNullable().defaultTo("").alter();

    table.integer("fv_ttfb").notNullable().defaultTo(0).alter();
    table.integer("fv_first_paint").notNullable().defaultTo(0).alter();
    table.integer("fv_start_render").notNullable().defaultTo(0).alter();
    table.integer("fv_last_visual_change").notNullable().defaultTo(0).alter();
    table.integer("fv_visual_complete").notNullable().defaultTo(0).alter();
    table.integer("fv_load_time").notNullable().defaultTo(0).alter();
    table.integer("fv_fully_loaded").notNullable().defaultTo(0).alter();
    table.integer("fv_speed_index").notNullable().defaultTo(0).alter();
    table.integer("fv_requests_made").notNullable().defaultTo(0).alter();
    table.integer("fv_bytes_downloaded").notNullable().defaultTo(0).alter();
    table.json("fv_domain_breakdown").notNullable().defaultTo("{}").alter();
    table.json("fv_content_breakdown").notNullable().defaultTo("{}").alter();

    table.integer("rv_ttfb").notNullable().defaultTo(0).alter();
    table.integer("rv_first_paint").notNullable().defaultTo(0).alter();
    table.integer("rv_start_render").notNullable().defaultTo(0).alter();
    table.integer("rv_last_visual_change").notNullable().defaultTo(0).alter();
    table.integer("rv_visual_complete").notNullable().defaultTo(0).alter();
    table.integer("rv_load_time").notNullable().defaultTo(0).alter();
    table.integer("rv_fully_loaded").notNullable().defaultTo(0).alter();
    table.integer("rv_speed_index").notNullable().defaultTo(0).alter();
    table.integer("rv_requests_made").notNullable().defaultTo(0).alter();
    table.integer("rv_bytes_downloaded").notNullable().defaultTo(0).alter();
    table.json("rv_domain_breakdown").notNullable().defaultTo("{}").alter();
    table.json("rv_content_breakdown").notNullable().defaultTo("{}").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("wpt_reports", table => {
    table.string("url").notNullable().alter();
    table.string("summary_url").notNullable().alter();
    table.string("location").notNullable().alter();
    table.string("connectivity").notNullable().alter();
    table.string("browser_name").notNullable().alter();
    table.string("browser_version").notNullable().alter();

    table.integer("fv_ttfb").notNullable().alter();
    table.integer("fv_first_paint").notNullable().alter();
    table.integer("fv_start_render").notNullable().alter();
    table.integer("fv_last_visual_change").notNullable().alter();
    table.integer("fv_visual_complete").notNullable().alter();
    table.integer("fv_load_time").notNullable().alter();
    table.integer("fv_fully_loaded").notNullable().alter();
    table.integer("fv_speed_index").notNullable().alter();
    table.integer("fv_requests_made").notNullable().alter();
    table.integer("fv_bytes_downloaded").notNullable().alter();
    table.json("fv_domain_breakdown").notNullable().alter();
    table.json("fv_content_breakdown").notNullable().alter();

    table.integer("rv_ttfb").notNullable().alter();
    table.integer("rv_first_paint").notNullable().alter();
    table.integer("rv_start_render").notNullable().alter();
    table.integer("rv_last_visual_change").notNullable().alter();
    table.integer("rv_visual_complete").notNullable().alter();
    table.integer("rv_load_time").notNullable().alter();
    table.integer("rv_fully_loaded").notNullable().alter();
    table.integer("rv_speed_index").notNullable().alter();
    table.integer("rv_requests_made").notNullable().alter();
    table.integer("rv_bytes_downloaded").notNullable().alter();
    table.json("rv_domain_breakdown").notNullable().alter();
    table.json("rv_content_breakdown").notNullable().alter();
  });
};
