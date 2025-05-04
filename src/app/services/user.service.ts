import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/api/users`;
  

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser() {
    return this.http.get<User>(`${this.baseUrl}/get/current`)
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, user). pipe (
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error', error);
    throw error;
  }
}
