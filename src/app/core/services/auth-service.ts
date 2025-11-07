import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { ApiResponse } from '../interfaces/api-response.interface';

interface TokenPayload {
  sub: number;
  role: 'ADMIN' | 'CLIENT';
  email: string;
  exp: number;
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

  login(data: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.api}/login`, data)
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

  register(data: RegisterRequest) {
    return this.http.post<ApiResponse<RegisterResponse>>(`${this.api}/register`, data);
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
}
