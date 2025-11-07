import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth-service';
import { RegisterRequest } from '../../core/interfaces/auth.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.valid) {
      this.authService.register(this.form.value as RegisterRequest).subscribe({
        next: (res) => {
          this.snackBar.open(res.message, 'Cerrar', { duration: 5000 });
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
        }
      });
    }
  }
}
