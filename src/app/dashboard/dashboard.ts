import { Component, inject } from '@angular/core';
import { PetList } from './pets/pet-list/pet-list';
import { AuthService } from '../core/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatButtonModule, PetList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private auth = inject(AuthService);

  logout() { this.auth.logout(); }

}
