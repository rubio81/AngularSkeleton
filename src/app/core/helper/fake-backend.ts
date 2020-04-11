import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from "../models/user.model";
import { USERS } from "../mocks/mock-users";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    
    console.log('fake-backend.intercept');
    
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // fake authenticate api end point
      if (request.url.endsWith('/api/authenticate/login') && request.method === 'POST') {
        let params = request.body;

        // check user credentials and return fake jwt token if valid
        let found: User = USERS.find((user: User) => {return (params.username === user.username);});
        if (found) {
          if(params.password === found.password) {
            return of(new HttpResponse({status: 200, body: {token: 'fake-token-jwt', user: found}}));
          }else{            
            return error('The password does not match', 2);
          }
        } else {          
          return error('Username does not exists', 1);
        }

      }

      if (request.url.endsWith('/api/authenticate/logout') && request.method === 'POST') {
        return of(new HttpResponse({status: 200, body: true}));
      }

      if (request.url.endsWith('/api/authenticate/resetPassword') && request.method === 'POST') {        
         let params = request.body;
         console.log('resetPassword backend: ' + JSON.stringify(params));
         // check user credentials and return fake jwt token if valid
         let found: User = USERS.find((user: User) => {return (params.username === user.username);});
         if (found) {
           if(params.password === found.password) {
             console.log('password changed');
             found.password = params.newPassword;
             return of(new HttpResponse({status: 200, body: {token: 'fake-token-jwt', user: found}}));
           }else{            
             return error('The password does not match', 2);
           }
         } else {          
           return error('Username does not exists', 1);
         }
       }

      // pass through any requests not handled above
      return next.handle(request);

    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function error(message: string, code: number) {
        return throwError(JSON.stringify({ code: code, message: message }));
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

// class MockError extends Response implements Error{
//     name: any;
//     message: any;
// }

// export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions){
//     backend.connections.subscribe((connection: MockConnection) => {
//         setTimeout(() => {
//           // fake authenticate api end point
//           if (connection.request.url.endsWith('/api/authenticate/login') && connection.request.method === RequestMethod.Post) {
//             let params = JSON.parse(connection.request.getBody());
//             // check user credentials and return fake jwt token if valid
//             let found: User = USERS.find((user: User) => {return (params.username === user.username);});
//             if (found) {
//               if(params.password === found.password) {
//                 connection.mockRespond(new Response(
//                   new ResponseOptions({status: 200, body: {token: 'fake-token-jwt', user: found}})
//                 ));
//               }else{
//                 connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 2, message: 'The password does not match '})})));
//               }
//             } else {
//               connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 1, message: 'Username does not exists'})})));
//             }
//           }
//           if (connection.request.url.endsWith('/api/authenticate/logout') && connection.request.method === RequestMethod.Post) {
//             let params = JSON.parse(connection.request.getBody());
//             connection.mockRespond(new Response(
//               new ResponseOptions({status: 200, body: true})
//             ));
//           }
//         }, 100);
//       });
//       return new Http(backend, options);
// }

// export let fakeBackendProvider = {
//     provide: Http,
//     useFactory: fakeBackendFactory,
//     deps: [MockBackend, BaseRequestOptions]
// }