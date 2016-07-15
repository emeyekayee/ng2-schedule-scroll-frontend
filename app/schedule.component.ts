import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { ResponseDataService }        from './response-data.service';
import { ResourceSpec, ResponseData } from './resource-time-block';
import { ResourceTimeBlock }          from './resource-time-block';
import { TimeVsPix }                  from './time-vs-pix';
import { TimespansDataComponent }     from './timespans-data.component';
import { ResourceLabelComponent }     from './resource-label.component';
import { ScheduleParams }             from './schedule-params';

@Component({
  selector: 'resource-schedule',
  template: `
    <h2><center> {{title}} </center></h2>

    <span *ngIf="resource_specs.length">
      <div class="schedule-container">
        <div class="labels-container">
          <div class="resource-labels">
            <resource-label *ngFor="let res_tag of resourceTags()"
                            [res_tag]="res_tag">
            </resource-label>
          </div>
        </div>

        <timespans-data [resource_specs]="resource_specs"
                        [timespans_hash]="timespans_hash"
                        [time_pix]="time_pix"
                        (moreData)="onMoreDataRequest($event)">
        </timespans-data>
      </div>
    </span>
  `,
  styleUrls: ['app/scheduled-resource.css'],
  directives: [ResourceLabelComponent, TimespansDataComponent],
  providers: [ResponseDataService]
})

export class ScheduleComponent implements OnInit {
  public title = '% Capacity';
  public response_data: ResponseData;
  public resource_specs: ResourceSpec[] = []
  public timespans_hash: any = {}; // ResponseData without 'meta' key.
  public time_pix: TimeVsPix;

  private _resource_tags: string[];
  private _busy = false;

  constructor(
    private router: Router,
    private _responseDataService: ResponseDataService) {}


  // FIX ME  This duplicates the same method in TimespansDataComponent.
  resourceTags(): string[] {
    return this.resource_specs.map( resource_spec => resource_spec.tag )
  }

  onMoreDataRequest(event: ScheduleParams) {
    let { t1, t2, inc } = event;
    this.requestData(t1, t2, inc);
  }

  // This is the gateway to data from (eventually) the server.
  getResponse(t1?: number, t2?: number, inc?: string) {
    this._busy = true;
    return this._responseDataService.getResponseData(t1, t2, inc)
      .then(
        function (response_data: ResponseData) {
          this.response_data = response_data;

          // Process response data.
          this.time_pix.merge_metadata(response_data);

          // Note: *may* update existing ones later.
          this.resource_specs = this.time_pix.meta.rsrcs;

          this._busy = false;

          return response_data
        }.bind(this)
      );
  }

  requestData(t1?: number, t2?: number, inc?: string) {
    if (!this._busy) {
      this.getResponse(t1, t2, inc)
        .then(
          function(response_data: ResponseData) {
            for (let res_tag in response_data) {
              this.addBlocksForResourceTag(res_tag,
                                           response_data[res_tag],
                                           inc);
            }
            // response_data goes out of scope;
          }.bind(this))
    }
  }

  addBlocksForResourceTag(res_tag: string,
                          new_blocks: ResourceTimeBlock[],
                          inc: string) {
    // Might want to sort these by block.blk.starttime just to be sure.

    let to_blocks = this.ensureTimespan(res_tag);
    let how = 'push'
    if (inc == 'lo') {
      how = 'unshift';
      new_blocks.reverse();
    }
    for (let block of new_blocks) {
      to_blocks[how](block);
    }
  }

  ensureTimespan(res_tag: string): ResourceTimeBlock[] {
    if (!this.timespans_hash[res_tag]) {
      this.timespans_hash[res_tag] = [];
    }
    return this.timespans_hash[res_tag];
  }

  ngOnInit() {
    // Construct a TimeVsPix; would call ~~'set_display_parms'
    this.time_pix = new TimeVsPix();

    // this.getResponse();
    this.requestData();
  }
}
