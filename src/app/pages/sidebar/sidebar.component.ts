import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  username : any = ''


  private apiUrl = `/${environment.apiUrl}api/users`


  constructor (
    private router: Router,
    private user: UserService,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.username
  }

  loadCurrentUser(): void {
    this.username = this.authService.username
  }

  logout() {
    this.authService.logout()
  }

  uname() {
    this.authService.username
  }
}
