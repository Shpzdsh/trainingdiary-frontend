import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Workout, WorkoutDto } from '../../../models/workout';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-workout-dialog',
  // standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule ],
  templateUrl: './workout-dialog.component.html',
  styleUrl: './workout-dialog.component.css'
})
export class WorkoutDialogComponent {
  // @ViewChild(WorkoutFormComponent) workoutForm?: WorkoutFormComponent;
  workoutForm: FormGroup;
  isEditMode: boolean = false;

  constructor (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {workout?: Workout, programId: number}
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      sets: [0, [Validators.required, Validators.min(1)]],
      reps: [0, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(0)]]
    });

    if (data.workout) {
      this.isEditMode = true;
      this.workoutForm.patchValue(data.workout);
    }
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const result: WorkoutDto = {
        ...this.workoutForm.value,
        programId: this.data.programId
      };
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

