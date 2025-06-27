import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AppComponent {
  title = 'Task Manager';
  
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  isAuthPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/login' || currentUrl === '/register';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
