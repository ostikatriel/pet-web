export interface Pet {
  id: number;
  name: string;
  species: string;
}

export interface CreatePetRequest {
  name: string;
  species: string;
}

export interface UpdatePetRequest {
  name: string;
  species: string;
}

export interface DeletedPetResponse {
  name: string;
  species: string;
}
