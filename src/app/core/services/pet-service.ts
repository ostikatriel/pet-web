import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { CreatePetRequest, DeletedPetResponse, Pet, UpdatePetRequest } from '../interfaces/pet.interface';

@Injectable({ providedIn: 'root' })
export class PetService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/pets`;

  getAll() {
    return this.http.get<ApiResponse<Pet[]>>(this.api);
  }

  create(data: CreatePetRequest) {
    return this.http.post<ApiResponse<Pet>>(this.api, data);
  }

  update(id: number, data: UpdatePetRequest) {
    return this.http.put<ApiResponse<Pet>>(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<ApiResponse<DeletedPetResponse>>(`${this.api}/${id}`);
  }
}
