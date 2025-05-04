import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Token } from '../models/token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)


  constructor() { }

  private apiUrl = `${environment.apiUrl}/auth`

  get isAuth() {
    console.log(this.getToken());
    return !!this.getToken();
  }

  get id() {
    return jwtDecode<{id:number}>(this.getToken()!).id;
  }

  get username() {
    return jwtDecode<{sub: string}>(this.getToken()!).sub;
  }

  editPassword(payload: {oldPassword: string, Password: string}) {
    return this.http.put(`${this.apiUrl}/edit_password`, payload, {responseType: 'text'});
  }

  register(payload: {username: string, password: string}) {
    return this.http.post<User>(
      `${this.apiUrl}/sign-up`,
      payload
    )
  }

  login(payload: {username: string, password: string}) {
    return this.http.post<Token>(
      `${this.apiUrl}/sign-in`,
      payload, {
        withCredentials: true,
      }
    ).pipe(
      tap(res => {
        this.saveToken(res);
      })
    )
  }

  logout() {
    this.deleteToken()
    this.router.navigate(['/login'])
  }

  saveToken(res: Token) {
    localStorage.setItem('access_token', res.token)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  deleteToken() {
    localStorage.clear()
  }


  // getUsername() {
  //   localStorage.getItem(this.username);
  // }
}
