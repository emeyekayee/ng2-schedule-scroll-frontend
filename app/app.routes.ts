import { provideRouter, RouterConfig }  from '@angular/router';

import { ScheduleComponent }    from './schedule.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'schedule',
    pathMatch: 'full'
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: DashboardComponent,
  // },
  {
    path: 'schedule',
    // name: 'Schedule',
    component: ScheduleComponent
    // useAsDefault: true
  }
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function is_top_path(path: string) {
  var topOnlyRegex = /^\/[^\/]*$/;
  // Ignore root path ''
  return path && topOnlyRegex.test(path)
};

function a_for_route(route: {path: string}) {
  var name = route.path || ''; // WAS: route.name
  name = capitalize(name.replace(/^\//, ''));
  return `<a [routerLink]="['${name}']">${name}</a>`;
};

function top_paths_markup() {
  var top_routes = routes.filter((route) => is_top_path(route.path));
  var anchors    = top_routes.map( a_for_route ).join("\n");
  return `<nav>\n${anchors}\n</nav>`
};

export const APP_NAV_MARKUP = top_paths_markup();

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
