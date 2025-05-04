import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-workout-program-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './workout-program-dialog.component.html',
  styleUrl: './workout-program-dialog.component.css'
})
export class WorkoutProgramDialogComponent {

  program: any = {};
  fb = inject(FormBuilder)

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(
    public dialogRef: MatDialogRef<WorkoutProgramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditing) {
      this.program = { ...data.program };
      this.form.patchValue({...data.program})
    }
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
