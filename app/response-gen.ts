import { ScheduleParams } from './schedule-params';

type Response = any; // Sadly.

// We have a data template which is just a response json hash for some arbitrary
// time.  To 'instantiate' the template we just copy the pieces and adjust the
// (start and end) times within.

// The template can be instantiated at offsets that are whole multiples of the
// width (meta.t2 - meta.t1).

// With parameters (t1, t2, inc) of a request, instantiate the template as many
// times as needed.

export class ResponseGen {
  public params:       ScheduleParams;
  public template:     Response;
  private to_response: Response;

  // params: ScheduleParams

  constructor(template: Response) {
    this.template    = template;
    this.to_response = {meta: this.dup_object(template.meta)};

    for (let res_tag of this.resource_tags()) {
      this.to_response[res_tag] = [];
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  common_template_values() {
    let tmplt_t1    = this.template.meta.t1;
    let tmplt_width = this.template.meta.t2 - tmplt_t1;
    let tmplt_age   = this.ux_time_now() - tmplt_t1;
    let tmplt_align = this.floor_in_units_of(tmplt_age, tmplt_width);
    return { t1:    tmplt_t1,
             width: tmplt_width,
             t1_for_now: tmplt_t1 + tmplt_align
           };
  }

  round_in_units_of(x, unit) {return unit * Math.round(x / unit);}

  floor_in_units_of(x, unit) {return unit * Math.floor(x / unit);}

  ux_time_now() {return Math.round(new Date().getTime() / 1000);}

  default_request_parameters(): ScheduleParams {
    let tmplt = this.common_template_values();
    let t1    = tmplt.t1_for_now;
    return { t1: t1, t2: t1 + tmplt.width, inc: null };
  }
  //////////////////////////////////////////////////////////////////////////////

  generate_response_for(t1, t2, inc) {
    this.params = new ScheduleParams(t1, t2, inc);

    // time translation delta (whole units of template width)
    let tmplt   = this.common_template_values();
    let delta_t = this.round_in_units_of(t1 - tmplt.t1, tmplt.width);
    let meta    = this.to_response.meta;

    while (tmplt.t1 + delta_t < t2) {
      for (let res_tag of this.resource_tags()) {
        this.generate_time_blocks(
          this.template[res_tag], this.to_response[res_tag], delta_t);
      }
      delta_t = delta_t + tmplt.width;
    }
    meta['t1'] = t1;
    meta['t2'] = t2;
    return this.to_response
  }

  // Make a copy of each template block with delta_t added to its time values.
  // Add it to the response (to_blocks) only if it fits within the request
  // parameters.  Modifies to_blocks array in-place.
   generate_time_blocks(from_blocks, to_blocks, delta_t) {

    for (let from_block of from_blocks) {
      let to_block = this.copy_block_at_offset(from_block, delta_t);

      if (this.filter_block_by_time(to_block)) {
        to_blocks.push(to_block);
      }
    }
  }

  // Structure of block is: { blk: {starttime: ...} }
  copy_block_at_offset(from_block, delta_t) {
    let to_block           = this.dup_object(from_block);
    let blk                = to_block.blk;

    blk.starttime = blk.starttime + delta_t;
    blk.endtime   = blk.endtime   + delta_t;

    // Iffy hack, but seems to work if client and timezones we're displaying are
    // on the Pacific-US side of the dateline.  (blk.starttime is at midnight in
    // that timezone)
    if ((blk.css_classes || '').match(/ZTimeHeaderDay/)) {
      var d = new Date((blk.starttime + 12 * 3600) * 1000);
      blk.title = d.toDateString().replace(/ \d{4}/, ',$&');
    }

    return to_block;
  }

  // Returns true if there is overlap b/t [t1..t2] and [starttime..endtime]
  // As in the server, the inc parameter is used to avoid returning a block
  // twice if it spans requests' t1/t2.
  filter_block_by_time(block) {
    let {t1: t1, t2: t2, inc: inc} = this.params;
    let blk = block.blk;

    if (inc == 'lo') {
      return blk.endtime <= t2 && blk.endtime > t1;
    }
    if (inc == 'hi') {
      return blk.starttime >= t1 && blk.starttime < t2;
    }
    return blk.starttime < t2 && blk.endtime > t1;
  }

  resource_tags() {
    return this.template.meta.rsrcs.map(rsrc => rsrc.tag);
  }

  dup_object(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
