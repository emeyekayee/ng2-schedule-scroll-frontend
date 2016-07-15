import { ResponseData, Meta, UseBlock } from './resource-time-block';

// NO  @set_display_parms: ()    => // Browser, etc:  @pixWindow
// NO  @scroll_to_thi:     ()    ->
// NO  @ux_time_of_pix:    (x)   ->
// NO  @scroll_to_tlo:     ()    => # bound
// NO  @scroll_monitor:    ()    =>

// In app/timespans-data.component.ts
//  @set_time_cursor: ()     =>  nowOffsetRoundPix(), setStyles()
//  @scroll_container:  ()   =>  scrollStyle()
//  @scroll_to_ux_time:(uxt) =>


export class TimeVsPix {
  public base_time          = 0;         // aka @baseTime
  public window_width_secs  = 24 * 3600; // aka @timeWindow
  public window_width_pix   = 850;       // aka @pixWindow

  // Throttled, set by TimespansDataComponent#scrollMonitor().
  public scrollLeft: number;

  // DOM has data for time range [dom_time_lo..dom_time_hi] (at least)
  public dom_time_lo: number;            // aka @tlo
  public dom_time_hi: number;            // aka @thi

  // Returned from most recent data request (superfluous)
  public meta = {};                     // aka @meta

  constructor() {};

  // Removes 'meta' tag from response_data.
  merge_metadata(response_data: ResponseData) {
    var meta = response_data.meta;
    if (meta) {
      this.meta = meta;
      if ( !this.base_time ) { this.base_time = meta['min_time'] }

      var tlo = this.dom_time_lo;
      this.dom_time_lo = tlo ? Math.min(tlo, meta.t1) : meta.t1;

      var thi = this.dom_time_hi;
      this.dom_time_hi = thi ? Math.max(thi, meta.t2) : meta.t2;

      if (meta.visible_time) { this.window_width_secs = meta.visible_time }

      delete response_data.meta;
    }
  }

  nextHi() { return this.dom_time_hi + this.window_width_secs }

  nextLo() { return this.dom_time_lo - this.window_width_secs }

  // Ignoring base_time offset
  secsToPixScale(seconds: number) { return seconds * this.pixPerSec() }

  pixPerSec() { return this.window_width_pix / this.window_width_secs }

  pixToSecs(pix: number) {
    return this.base_time + Math.round(pix / this.pixPerSec());
  }

  visible_time_bounds(scrollLeft: number) {
    let lVisTime = this.pixToSecs(scrollLeft);
    let rVisTime = lVisTime + this.window_width_secs;
    return [lVisTime, rVisTime]
  }

  visible_pix_bounds() {
    let left: number = this.scrollLeft || 0;
    return [left, left + this.window_width_pix];

  }

  paramsForMoreData(scroll_left: number) {
    let [leftVisTime, rightVisTime] = this.visible_time_bounds(scroll_left);

    if (rightVisTime > this.dom_time_hi) {
      let t1 = this.dom_time_hi;
      let t2 = this.nextHi();
      let inc = 'hi';
      return {t1, t2, inc};
    } else if (leftVisTime < this.dom_time_lo) {
      let t1 = this.nextLo();
      let t2 = this.dom_time_lo;
      let inc = 'lo';
      return {t1, t2, inc};
    }
    return null;
  }

  blockGeoHash(block: UseBlock) {
    let [s, e]: number[] = [block.starttime, block.endtime];
    let left: number     = this.secsToPixScale(s - this.base_time);
    let width: number    = this.secsToPixScale(e-s);
    let right: number    = left + width;
    return {left, width, right};
  }

  uxTimeNow() { return new Date().valueOf() / 1000 }

  uxTimeOffset(ux_time: number) { return ux_time - this.base_time }

  uxTimeOffsetPix(ux_time: number) {
    return this.secsToPixScale( this.uxTimeOffset(ux_time) )
  }
}
