import { Component, inject, OnInit } from '@angular/core';
import { Workout, WorkoutDto } from '../../../models/workout';
import { WorkoutService } from '../../../services/workout.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDialogComponent } from '../workout-dialog/workout-dialog.component';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-workout-page',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './workout-page.component.html',
  styleUrl: './workout-page.component.css'
})
export class WorkoutPageComponent implements OnInit{

  workouts: Workout[] = [];

  programId: number | null = null

  newWorkout: any = {};

  router = inject(Router);

  constructor(
    private workoutService: WorkoutService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
      // const urlParams = new URLSearchParams(window.location.search);
      // this.programId = Number(urlParams.get('programId'));
      this.route.paramMap.subscribe(params => {
        const id = params.get('programId');
        this.programId = id ? +id : null
      })
      if (this.programId !== null) {
        this.getWorkouts(this.programId);
      }
  }

  loadWorkouts(): void {
    if (this.programId) {
      // console.log('id', this.programId)
      this.workoutService.getWorkoutsByProgram(this.programId).subscribe(
        data => {
          this.workouts = data;
          // console.log('lengh = %d', this.workouts.length);
        }


        // error => console.error('Error fetching workouts', error)
      );
    }
  }

  getWorkouts(programId: number): void {
    this.workoutService.getWorkoutsByProgram(programId).subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  addWorkout(): void {
    this.workoutService.createWorkout(this.newWorkout).subscribe(workout => {
      this.workouts.push(workout);
      this.newWorkout = {};
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      width: '500px',
      data: { programId: this.programId }
    });

    dialogRef.afterClosed().subscribe((result: WorkoutDto) => {
      if (result) {
        this.workoutService.createWorkout(result)
          .subscribe(() => this.loadWorkouts());
      }
    });
  }

  openEditDialog(workout: Workout): void {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      width: '500px',
      data: {
        programId: this.programId,
        workout: {
          name: workout.name,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          programId: workout.programId
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: WorkoutDto) => {
      if (result) {
        this.workoutService.updateWorkout(workout.id!, result)
          .subscribe(() => this.loadWorkouts());
      }
    });
  }

  editWorkout(workout: Workout): void {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      width: '500px',
      data: { workout, programId: this.programId }
    });

    dialogRef.afterClosed().subscribe((result: WorkoutDto) => {
      if (result && workout.id) {
        this.workoutService.updateWorkout(workout.id, result).subscribe({
          next: () => this.loadWorkouts(),
          error: err => console.error('Error updating workout', err)
        });
      }
    });
  }

  deleteWorkout(id: number): void {
    if (confirm('Are you sure you want to delete this workout?')) {
      this.workoutService.deleteWorkout(id).subscribe({
        next: () => this.loadWorkouts(),
        error: err => console.error('Error deleting workout', err)
      });
    }
  }
}
