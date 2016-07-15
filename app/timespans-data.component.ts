import { Component, OnInit }           from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { InfiniteScroll }              from 'angular2-infinite-scroll';

import { TimeVsPix }                   from './time-vs-pix';
import { TimespanComponent }           from './timespan.component';
import { CurrentTimeCursorComponent }  from './current-time-cursor.component';
import { ResponseData, ResourceSpec }  from './resource-time-block';

@Component({
  selector: 'timespans-data',
  // Invoke as:
  //   <timespans-data [resource_specs]="resource_specs"
  //                   [timespans_hash]="timespans_hash"
  //                   [time_pix]="time_pix"></timespans-data>
  template: `
    <div class="timespans-container">
      <div class="scrolling-container"
           [scrollLeft]="initScrollLeft"

           infinite-scroll      [scrollWindow]="false"
           [horizontal]="true"  [alwaysCallback]="true"
           (scrolledUp)="scrollMonitor($event)"
           (scrolled)="scrollMonitor($event)"
           >
        <div class="positioned-container">

          <current-time-cursor [time_pix]="time_pix"></current-time-cursor>

          <div *ngFor="let res_tag of resourceTags()"
               class="rsrcRow {{ kindFromTag(res_tag) }}Row">

            <timespan [time_blocks]="timespans_hash[res_tag]"
                      [time_pix]="time_pix"></timespan>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['app/scheduled-resource.css'],
  directives: [InfiniteScroll, TimespanComponent, CurrentTimeCursorComponent],
  providers: []
})

export class TimespansDataComponent implements OnInit {
  @Output() moreData =            new EventEmitter();
  @Input()  resource_specs:       ResourceSpec[];
  @Input()  timespans_hash:       ResponseData;
  @Input()  time_pix:             TimeVsPix;

  public    initScrollLeft:       number;

  private old_scroll:             number = 0;
  private old_scroll_time:        number = 0;

  scrollMonitor(data: any = {}) {
    let scrollLeft = data.currentScrollPosition;
    if (typeof scrollLeft == 'number') {

      if (this.scrollMovedEnuf(scrollLeft)) {

        // Fetch more data if needed
        let dataParams = this.time_pix.paramsForMoreData(scrollLeft);
        if (dataParams) {
          this.moreData.emit(dataParams);
        }
      }

      let now = (new Date).getTime();
      // Need to trigger this the first time so change detection will re-invoke
      // UseBlock#styleTextLocate()
      if (true || !this.time_pix.scrollLeft || now - this.old_scroll_time > 1000) {

        // filterJustifyTweaks( sc ); // Try to make scrolled-off text visible
        if (this.time_pix.scrollLeft != scrollLeft) {
          this.time_pix.scrollLeft = scrollLeft;
        }
        this.old_scroll_time     = now;
      }
    }
  }

  scrollMovedEnuf(scrollLeft) {
    if (Math.abs(this.old_scroll - scrollLeft) > 0) {
      this.old_scroll = scrollLeft;
      return true
    }
    return false
  }

  kindFromTag(tag) {
    return tag.split('_')[0]
  }

  resourceTags(): string[] {
    return this.resource_specs.map( resource_spec => resource_spec.tag )
  }

  ngOnInit() {
    // A convenient place to start:
    let uxt             = this.time_pix.uxTimeNow();
    this.initScrollLeft = this.time_pix.uxTimeOffsetPix(uxt) - 300;
  }
}
