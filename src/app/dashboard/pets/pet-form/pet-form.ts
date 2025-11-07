import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from '../../../core/pet-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-pet-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css',
})
export class PetForm {
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private dialogRef = inject(MatDialogRef<PetForm>);
  private snackBar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: ['', Validators.required],
    species: ['', Validators.required]
  });

  ngOnInit() {
    if (this.data) this.form.patchValue(this.data);
  }

  submit() {
    if (this.form.valid) {
      const req = this.data
        ? this.petService.update(this.data.id, this.form.value)
        : this.petService.create(this.form.value);
      req.subscribe({
        next: (res) => {
          this.snackBar.open(res.message, 'Cerrar', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
        }
      });
    }
  }
}
