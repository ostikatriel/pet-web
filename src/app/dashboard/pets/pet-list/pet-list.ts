import { Component, inject, OnInit } from '@angular/core';
import { PetService } from '../../../core/pet-service';
import { CommonModule } from '@angular/common';
import { PetForm } from '../pet-form/pet-form';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth-service';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(PetService);
  private dialog = inject(MatDialog);
  public authService = inject(AuthService);
  pets: any[] = [];
  cols = ['name', 'species', 'actions'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.petService.getAll().subscribe(p => this.pets = p);
  }

  delete(id: number) {
    this.petService.delete(id).subscribe(() => this.load());
  }

  openForm(pet?: any) {
    const dialogRef = this.dialog.open(PetForm, { data: pet });
    dialogRef.afterClosed().subscribe(() => this.load());
  }
}