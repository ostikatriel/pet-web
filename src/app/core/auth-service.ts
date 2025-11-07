import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface TokenPayload {
  sub: number;
  role: 'ADMIN' | 'CLIENT';
  email: string;
  exp: number;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  user = signal<TokenPayload | null>(null);
  private snackBar = inject(MatSnackBar);
  api = `${environment.apiUrl}/auth`;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) this.decodeAndSet(token);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<ApiResponse<{ token: string }>>(`${this.api}/login`, data)
      .subscribe({
        next: res => {
          if (res.data?.token) {
            localStorage.setItem('token', res.data.token);
            this.decodeAndSet(res.data.token);
            this.router.navigateByUrl('/dashboard');
            this.snackBar.open(res.message, 'Cerrar', { duration: 5000 });
          }
        },
        error: err => {
          this.snackBar.open(err.error.message, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
        }
      });
  }

  register(data: any) {
    return this.http.post<ApiResponse<any>>(`${this.api}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
    this.router.navigateByUrl('/login');
  }

  private decodeAndSet(token: string) {
    const decoded = jwtDecode<TokenPayload>(token);
    this.user.set(decoded);
  }

  get token() {
    return localStorage.getItem('token');
  }

  hasRole(role: string | undefined): boolean {
    return !!role && this.user()?.role === role;
  }
}
