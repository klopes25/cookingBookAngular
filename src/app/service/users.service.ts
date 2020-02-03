import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUri:string = 'http://localhost:4000/api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // create a user
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get user
  getUser(login, password): Observable<any> {
    let url = `${this.baseUri}/${login}/${password}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || null
      }),
      catchError(this.errorMgmt)
    )
  }

  // update user
  updateUser(login, data): Observable<any> {
    let url = `${this.baseUri}/${login}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
