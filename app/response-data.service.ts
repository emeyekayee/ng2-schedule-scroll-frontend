import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { ResponseGen }    from './response-gen';
import { ScheduleParams } from './schedule-params';

import 'rxjs/add/operator/toPromise';

type Response = Object; // Sadly.

@Injectable()
export class ResponseDataService {

  private scheduleUrl = 'app/schedule'; // URL to (in-memory) web api
                                        // matches data {schedule: ...}
  constructor(private http: Http) { }

  getTestTemplate(): Promise<Response> {
    return this.http.get(this.scheduleUrl)
               .toPromise()
               .then(response => response.json().data) // just for in-memory 
               .catch(this.handleError);
  }

  // Normally we'd encode request parameters into the URL here and pass
  // them through http (for now, in-memory-data service).  To avoid that
  // hack, treat what we get from http/in-memory-data as the template
  // and process request with params here.
  getResponseData(t1, t2, inc): Promise<Response> {
    return this.getTestTemplate()
      .then( template => this.processTemplate(template, t1, t2, inc) );
  }

  processTemplate(template, t1, t2, inc) {
    let generator = new ResponseGen(template);

    if (!t1) { // default parameters
      let dflt = generator.default_request_parameters();
      // TODO: Why doesn't this destructure?: {t1, t2, inc} = dflt;
      t1  = dflt.t1;
      t2  = dflt.t2;
      inc = dflt.inc;
    }

    return generator.generate_response_for(t1, t2, inc);
  }

  private handleError(error: any) {
    console.error('An error handled in app/response-data.service.ts', error);
    return Promise.reject(error.message || error);
  }
}
