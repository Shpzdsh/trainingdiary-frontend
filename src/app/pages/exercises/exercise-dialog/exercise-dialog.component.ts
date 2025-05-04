import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ExerciseDto } from '../../../models/exercise';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-exercise-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOption,
    CommonModule

  ],
  templateUrl: './exercise-dialog.component.html',
  styleUrl: './exercise-dialog.component.css'
})
export class ExerciseDialogComponent {

  exerciseForm: FormGroup;
  muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Abs', 'Cardio'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExerciseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workoutId: number }
  ) {
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      muscleGroup: ['', Validators.required],
      workoutId: [this.data.workoutId]
    });
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      this.dialogRef.close(this.exerciseForm.value as ExerciseDto);
    }
  }
}
