import { Component, Input, OnChanges }            from '@angular/core';
import { TimeVsPix }                              from './time-vs-pix';
import { ResourceTimeBlock, GeoHash, StyleHash }  from './resource-time-block';


@Component({
  selector: 'use-block',
  // Invoke as:
  //   <use-block [block]="time_block" [time_pix]="time_pix"></use-block>
  template: `
    <div class="{{ block.blk.css_classes }}blockdiv"
         [ngStyle]="styleHash(block.blk)">

      <div class="text_locator"
           [ngStyle]="styleTextLocate()">
        <a title="{{ title_popup() }}" href="">
           {{block.blk.title}}</a>
      </div>

    </div>
    `,
  styleUrls: ['app/scheduled-resource.css'],
  inputs: ['block', 'time_pix']
})

export class UseBlockComponent { // implements OnChanges
  @Input() block: ResourceTimeBlock;
  @Input() time_pix: TimeVsPix;  // Access to time vs pixel calculations

  private _geo_hash: GeoHash;                   // cache time_pix.geoHash()
  private _style_hash: StyleHash;               // cache for blockdiv

  private old_text_locator_left:  number;       // cache for text-locator
  private old_text_locator_width: number;
  private old_text_locator_style: any;

  static debug_this_instance: UseBlockComponent;

  styleTextLocate() {
    let new_text_locate_pair = this.makeTextLocatePair();

    if (!new_text_locate_pair) {
      return;                                   // undefined
    }

    let [tl_left, tl_width] = new_text_locate_pair;
    if (tl_left  == this.old_text_locator_left &&
        tl_width == this.old_text_locator_width) {
      return this.old_text_locator_style;       // no change
    }

    let tl_style = { left: `${tl_left}px`,
                    width: `${tl_width}px` };
    this.old_text_locator_left  = tl_left;
    this.old_text_locator_width = tl_width;
    this.old_text_locator_style = tl_style;

    return tl_style                             // something new;
  }

  makeTextLocatePair() {
    if (!this.block.blk.css_classes.match(/ZTimeHeaderDayRow/)) {
      return;
    }

    let [scrollLeft, scrollRight] = this.time_pix.visible_pix_bounds();
    let {left, width, right}      = this.geoHash();

    // Still initializing
    if (scrollLeft == 0) {return;}

    // Out of sight
    if (left >= scrollRight || right <= scrollLeft) {return;}

    // straddles both left and right of visible window
    if (left <= scrollLeft && right >= scrollRight ) {
      let nleft  = scrollLeft - left;
      let nwidth = this.time_pix.window_width_pix;
      return [nleft, nwidth];
    }

    // straddles right
    if (scrollRight <= right) {
      let visWidth = scrollRight - left;
      let jwidth   = Math.max( visWidth, 190 )
      return [   0, jwidth];
    }

    // straddles left
    if (left <= scrollLeft) {
      let jleft  = Math.min (scrollLeft - left, width - 190 );
      let jwidth = width - jleft;
      return [jleft, jwidth];
    }

    // straddles neither -- fully within visible window
    return [left, width];
  }

  geoHash() {
    if (!this._geo_hash) {
      this._geo_hash = this.time_pix.blockGeoHash( this.block.blk );
    }
    return this._geo_hash;
  }

  styleHash() {
    if (!this._style_hash) {
      this.makeStyleHash();
    }
    return this._style_hash;
  }

  makeStyleHash() {
    let {left, width} = this.geoHash();
    this._style_hash = { left: `${left}px`,
                         width: `${width - 3}px`  // per margins
                       };

    // TODO: Separate these background color flags
    var usage = this.block.blk.total_capacity_usage;
    if (usage) {
      if (usage > 0.8) { this._style_hash.background = 'orange' }
      if (usage > 1.0) { this._style_hash.background = 'red'    }
    }
  }

  title_popup() {
    return ""; // For performance, calculate popups only on-hover.
  }

  // ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     let cur  = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  // }
}
