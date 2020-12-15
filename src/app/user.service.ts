import { Injectable } from '@angular/core';
import { User } from "./user";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { MessageService } from "./message.service";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private log(message: String) {
    this.messageService.add(`UserService: ${message}`);
  }

  private usersUrl = 'http://localhost:8080/api/users';

  private handleError<T>(operation = 'operation', result?: T){
    return( error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  searchUsers(term: string): Observable<User[]>{
    if(!term.trim()) {
      return of([]);
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>(`getUsers`, []))
    );
  }

  getUser(id: Number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id = ${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  } 

  constructor(private messageService: MessageService,private http: HttpClient) { }


}
