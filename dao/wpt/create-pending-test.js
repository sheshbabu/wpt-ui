const db = require("../../util/db");

function createPendingTest(testId, jsonUrl) {
  const knex = db.getKnex();
  return knex("wpt_reports").insert({
    test_id: testId,
    status: "pending",
    url: "",
    json_url: jsonUrl,
    summary_url: "",
    location: "",
    connectivity: "",
    browser_name: "",
    browser_version: "",
    fv_ttfb: 0,
    fv_first_paint: 0,
    fv_start_render: 0,
    fv_last_visual_change: 0,
    fv_visual_complete: 0,
    fv_load_time: 0,
    fv_fully_loaded: 0,
    fv_speed_index: 0,
    fv_requests_made: 0,
    fv_bytes_downloaded: 0,
    fv_domain_breakdown: {},
    fv_content_breakdown: {},
    rv_ttfb: 0,
    rv_first_paint: 0,
    rv_start_render: 0,
    rv_last_visual_change: 0,
    rv_visual_complete: 0,
    rv_load_time: 0,
    rv_fully_loaded: 0,
    rv_speed_index: 0,
    rv_requests_made: 0,
    rv_bytes_downloaded: 0,
    rv_domain_breakdown: {},
    rv_content_breakdown: {}
  });
}

module.exports = createPendingTest;
