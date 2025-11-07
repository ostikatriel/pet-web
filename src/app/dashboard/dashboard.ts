import { Component, inject } from '@angular/core';
import { PetList } from './pets/pet-list/pet-list';
import { AuthService } from '../core/services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatButtonModule, PetList, MatChipsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public authService = inject(AuthService);

  logout() { this.authService.logout(); }

}
