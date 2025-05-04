import { Component } from '@angular/core';
import { Exercise } from '../../../models/exercise';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-exercise-page',
  imports: [
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatButtonModule

  ],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.css'
})
export class ExercisePageComponent {

  exercises: Exercise[] = [];
  workoutId!: number;
  displayedColumns: string[] = ['name', 'muscleGroup', 'description', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.workoutId = +this.route.snapshot.params['workoutId'];
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.getExercisesByWorkout(this.workoutId)
      .subscribe(exercises => this.exercises = exercises);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ExerciseDialogComponent, {
      width: '500px',
      data: { workoutId: this.workoutId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseService.createExercise(result)
          .subscribe({
            next: () => {
              this.loadExercises();
              this.snackBar.open('Exercise added successfully', 'Close', { duration: 3000 });
            },
            error: () => this.snackBar.open('Error adding exercise', 'Close', { duration: 3000 })
          });
      }
    });
  }

  deleteExercise(id: number): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseService.deleteExercise(id)
        .subscribe({
          next: () => {
            this.loadExercises();
            this.snackBar.open('Exercise deleted successfully', 'Close', { duration: 3000 });
          },
          error: () => this.snackBar.open('Error deleting exercise', 'Close', { duration: 3000 })
        });
    }
  }
}
