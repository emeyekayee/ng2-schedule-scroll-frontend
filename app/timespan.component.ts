import { Component, Input }  from '@angular/core';

import { TimeVsPix }         from './time-vs-pix';
import { UseBlockComponent } from './use-block.component';
import { ResourceTimeBlock } from './resource-time-block';

@Component({
  selector: 'timespan',
  // Invoke as: 
  //   <timespan [time_blocks]="time_blocks"
  //             [time_pix]="time_pix"></timespan>
  template: `
    <div *ngFor="let time_block of time_blocks" class="timespan">
      <use-block [block]="time_block"
                 [time_pix]="time_pix"></use-block>
    </div>
  `,
  styleUrls: ['app/scheduled-resource.css'],
  directives: [UseBlockComponent],
  providers: [] // TimeBlocksService ???
})

export class TimespanComponent {
  @Input() time_blocks: ResourceTimeBlock[];
  @Input() time_pix:    TimeVsPix;
}
