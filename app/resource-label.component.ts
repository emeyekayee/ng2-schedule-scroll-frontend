import { Component, OnInit } from '@angular/core';

const METRO_SHORT_NAME = {
    '1':  'SFO', // San Francisco
    '3':  'BUR', // Glendale
    '4':  'SJC', // San Jose
    '6':  'SMO', // Santa Monica
    '7':  'ORD', // Chicago
    '8':  'IAD', // Washington D.C.
    '24': 'HNL', // Honolulu
    '25': 'IND', // Indianapolis
    '35': 'IAH'  // Houston
  };

@Component({
  selector: 'resource-label',
  template: `
    <div class="rsrclabel rsrcRow {{ kind() }}Row">
      <div>
        {{ getLabel() }}
        <sub>{{ getSub() }}</sub>
      </div>
    </div>
    `,
  // Never used AFAIK:    class="label-text"
  inputs:    ['res_tag'],
  styleUrls: ['app/scheduled-resource.css']
})

export class ResourceLabelComponent implements OnInit {
  public   res_tag: string;
  private  _kind:   string;
  private  _sub:    string;
  private  _label:  string;

  ngOnInit() {
    var [kind, rid] = this.res_tag.split('_');

    this._kind = kind
    this._label = rid;

    // This is WRONG -- at least ugly.
    if (kind == 'MetroSummary') {
      this._label = this.labelForMetroId(parseInt(rid));
    }

    if (kind.match(/ZTime/) ) {
      this._sub = rid;

      if (kind.match(/Day/)) {
        this._label = 'Day';
      }
      if (kind.match(/Hour/)) {
        this._label = 'Hour'
      }
    }
  }

  kind() { return this._kind; }

  getSub() { return this._sub || ''; }

  getLabel() { return this._label; }

  labelForMetroId(id: number) {
    return (METRO_SHORT_NAME[id] || '???');
  }
}
