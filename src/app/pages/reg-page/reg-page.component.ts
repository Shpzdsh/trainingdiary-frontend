import { AuthService } from './../../auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.css'
})
export class RegPageComponent {
  showPassword = signal<boolean>(false)
  showConfirmPassword = signal<boolean>(false)
  authService = inject(AuthService)
  router = inject(Router)

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmpassword: new FormControl(null, Validators.required),

  }, {validators: this.passwordMatchValidator});

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    const isMatching = password.value === confirmPassword.value;
    if (!isMatching) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  onSubmit(event: Event) {
    console.log('submit');
    // if(this.form.valid) {
      if(this.form.value.password === this.form.value.confirmpassword) {
        this.authService.register(this.form.value).subscribe({
          next: (response) => {
            console.log(response)
            this.router.navigateByUrl("/login")
          },
          error: (error) => {
            console.error('error registration', error);
          }
        });

        console.log('forms send!', this.form.value);
      }
      else {
        console.log('pass:',this.form.value.password);
        console.log('passconf:' ,this.form.value.confirmPassword);
        console.error("pasword is missed!");
      }
    }
  }
// }
