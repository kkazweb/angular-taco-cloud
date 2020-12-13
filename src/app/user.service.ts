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

  // private usersUrl = 'api/users';

  private handleError<T>(operation = 'operation', result?: T){
    return( error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.userEndpoint).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>(`getUsers`, []))
    );
  }

  constructor(private messageService: MessageService,private http: HttpClient) { }


}
