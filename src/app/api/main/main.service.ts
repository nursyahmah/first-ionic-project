import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class MainService {

//   constructor() { }
// }
/**
* Api is a generic RESTful Api handler. Set your API url first.
*/
@Injectable()
export class MainService {
//  url : string = 'https://ionic-training.dpay.my/api';
url : string = 'http://10.9.5.63/test/index.php';
 constructor(
   public http : HttpClient,
 ) { }

 get(endpoint: string, params?: any, reqOpts?: any) {
   const headers = new HttpHeaders({
     'Content-Type': 'application/json; charset=utf-8',
   });

   if (!reqOpts) {
     reqOpts = {
       headers: headers,
       params: new HttpParams(),
     };
   }

   // Support easy query params for GET requests
   if (params) {
     reqOpts.params = new HttpParams();
     for (let k in params) {
       reqOpts.params = reqOpts.params.set(k, params[k]);
     }
   }

   console.log("API Call: " + endpoint + " Data: " + JSON.stringify(params));

   return this.http.get(this.url + '/' + endpoint, reqOpts);
 } // end get()

 post(endpoint: string, body: any, reqOpts?: any) {
   const headers = new HttpHeaders({
     'Content-Type': 'application/json; charset=utf-8',
   });

   if (!reqOpts) {
     reqOpts = {
       headers: headers,
       params: new HttpParams()
     };
   }

   console.log("API Call: " + endpoint + " Data: " + JSON.stringify(body));

   return this.http.post(this.url + '/' + endpoint, body, reqOpts);
 } // end post()
}

