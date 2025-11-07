import { Component, inject, OnInit } from '@angular/core';
import { PetService } from '../../../core/pet-service';
import { CommonModule } from '@angular/common';
import { PetForm } from '../pet-form/pet-form';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HasRoleDirective } from '../../../core/has-role.directive';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, HasRoleDirective],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(PetService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  public authService = inject(AuthService);
  pets: any[] = [];
  cols = ['name', 'species', 'actions'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.petService.getAll().subscribe(p => this.pets = p.data as any[]);
  }

  delete(id: number) {
    this.petService.delete(id).subscribe({
      next: (res) => {
        this.load();
        this.snackBar.open(res.message, 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }

  openForm(pet?: any) {
    const dialogRef = this.dialog.open(PetForm, { data: pet });
    dialogRef.afterClosed().subscribe(() => this.load());
  }
}