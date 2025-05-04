import { Workout } from './../../../models/workout';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { WorkoutDto } from '../../../models/workout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../services/workout.service';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-workout-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatFormFieldModule,
    MatIcon
  ],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {
  @Input() workout?: Workout
  @Input() programId!: number
  @Input() workoutToEdit?: WorkoutDto;
  @Output() workoutCreated = new EventEmitter<WorkoutDto>

  workoutForm: FormGroup;


  constructor (
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      name: [''],
      sets: [0, [Validators.required, Validators.min(1)]],
      reps: [0, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      programId: [this.programId, Validators.required]
    });
  }

  // ngOnChanges() {
  //   if (this.workout) {
  //     this.workoutForm.patchValue({
  //     name: this.workout.name,
  //     sets: this.workout.sets,
  //     reps: this.workout.reps,
  //     weight: this.workout.weight,
  //     programId:this.workout?.programId
  //   });
  //   } else if (this.programId) {
  //     this.workoutForm.patchValue({
  //       programId: this.programId
  //     });
  //   }
  // }

  ngOnChanges(): void {
    if (this.workoutToEdit) {
      this.workoutForm.patchValue(this.workoutToEdit);
    }
  }

  // onSubmit() {
  //   if (this.workoutForm.valid) {
  //     this.submitForm.emit(this.workoutForm.value);
  //   }
  // }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const workoutDto: WorkoutDto = {
        ...this.workoutForm.value,
        programId: this.programId
      };

      if (this.workoutToEdit) {
        // Handle update if needed
      } else {
        this.workoutService.createWorkout(workoutDto)
          .subscribe(() => {
            this.workoutForm.reset();
            this.workoutCreated.emit();
          });
      }
    }
  }

}


