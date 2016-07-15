import {Component, OnInit}   from '@angular/core';
import {TimeVsPix}           from './time-vs-pix';

@Component({
  selector: 'current-time-cursor',
  // Invoke as:
  //   <current-time-cursor [time_pix]="time_pix"></current-time-curso>
  //
  template: `
    <div [ngStyle]="time_cursor_left"
         class="current-time-cursor"></div>
  `,
  styleUrls: ['app/scheduled-resource.css'],
  inputs: ['time_pix']
})

export class CurrentTimeCursorComponent implements OnInit {
  public time_pix:         TimeVsPix;
  public time_cursor_left: Object;

  // From time-pix.js.coffee
  updateTimeCursor() {
    this.time_cursor_left = { left: `${this.nowOffsetRoundPix()}px` };

    setTimeout(() => {this.updateTimeCursor()}, 1000 * 10);
  }

  ngOnInit() {
    this.updateTimeCursor();
  }
  
  timeCursorLeft() {
    return this.time_cursor_left;
  }

  nowOffsetRoundPix() {
    let uxt = this.time_pix.uxTimeNow();
    return Math.round(this.time_pix.uxTimeOffsetPix(uxt));
  }
}
