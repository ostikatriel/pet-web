import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from './auth-service';

@Injectable({ providedIn: 'root' })
export class PetService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/pets`;

  getAll() {
    return this.http.get<ApiResponse<any[]>>(this.api);
  }

  create(data: any) {
    return this.http.post<ApiResponse<any>>(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.put<ApiResponse<any>>(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<ApiResponse<any>>(`${this.api}/${id}`);
  }
}
