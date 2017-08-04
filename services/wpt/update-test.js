const axios = require("axios");
const wptDao = require("../../dao/wpt");

async function updateTest(testId) {
  const jsonUrl = await wptDao.getJsonUrl(testId);
  const response = await axios.get(jsonUrl);
  const body = response.data.data;
  const result = mapResponse(body);
  return wptDao.updateTest(testId, result);
}

function mapResponse(body) {
  const { firstView, repeatView } = body.median;
  return {
    status: "completed",
    url: body.testUrl,
    summary_url: body.summary,
    location: body.location,
    connectivity: body.connectivity,
    browser_name: firstView.browser_name,
    browser_version: firstView.browser_version,
    fv_ttfb: firstView.TTFB,
    fv_first_paint: firstView.firstPaint,
    fv_start_render: firstView.render,
    fv_last_visual_change: firstView.lastVisualChange,
    fv_visual_complete: firstView.visualComplete,
    fv_load_time: firstView.loadTime,
    fv_fully_loaded: firstView.fullyLoaded,
    fv_speed_index: firstView.SpeedIndex,
    fv_requests_made: firstView.requestsFull,
    fv_bytes_downloaded: firstView.bytesIn,
    fv_domain_breakdown: getBreakdownList(firstView.domains),
    fv_content_breakdown: getBreakdownList(firstView.breakdown),
    rv_ttfb: repeatView.TTFB,
    rv_first_paint: repeatView.firstPaint,
    rv_start_render: repeatView.render,
    rv_last_visual_change: repeatView.lastVisualChange,
    rv_visual_complete: repeatView.visualComplete,
    rv_load_time: repeatView.loadTime,
    rv_fully_loaded: repeatView.fullyLoaded,
    rv_speed_index: repeatView.SpeedIndex,
    rv_requests_made: repeatView.requestsFull,
    rv_bytes_downloaded: repeatView.bytesIn,
    rv_domain_breakdown: getBreakdownList(repeatView.domains),
    rv_content_breakdown: getBreakdownList(repeatView.breakdown)
  };
}

function getBreakdownList(breakdown) {
  const list = Object.keys(breakdown).map(name => {
    const bytesDownloaded = breakdown[name].bytes;
    const requestsMade = breakdown[name].requests;
    return {
      name,
      bytes_downloaded: bytesDownloaded,
      requests_made: requestsMade
    };
  });
  return JSON.stringify(list);
}

module.exports = updateTest;
