import { Component }                        from '@angular/core';
import { ROUTER_DIRECTIVES }                from '@angular/router';

// import { RouteConfig, ROUTER_DIRECTIVES }   from '@angular/router-deprecated';
// import { ROUTER_PROVIDERS }                 from '@angular/router-deprecated';

import { routes, APP_NAV_MARKUP }           from './app.routes';

import { ScheduleComponent }                from './schedule.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{heading}} ${APP_NAV_MARKUP}</h1>
    
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  precompile: [ScheduleComponent]
})

export class AppComponent {
  heading = 'Navigation:';
}
