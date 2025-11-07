import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
  api = `${environment.apiUrl}/auth`;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) this.decodeAndSet(token);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data)
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          this.decodeAndSet(res.token);
          this.router.navigateByUrl('/dashboard');
        }
      });
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
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