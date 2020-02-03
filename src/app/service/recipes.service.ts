import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  baseUri:string = 'http://localhost:4000/api/recipes';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get all recipes
  getAllRecipes(){
    let url = `${this.baseUri}/`;
    return this.http.get(`${this.baseUri}`);
  }

  // Get recipe
  getRecipe(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || []
      }),
      catchError(this.errorMgmt)
    )
  }

   // Create recipe
   createRecipe(data): Observable<any> {
    let url = `${this.baseUri}/`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Update recipe
  updateRecipe(recipeID, update){
    let url = `${this.baseUri}/${recipeID}`;
    return this.http.put(url, update, { headers: this.headers })
      .pipe(
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