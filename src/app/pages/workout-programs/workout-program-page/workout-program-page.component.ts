import { WorkoutProgramDialogComponent } from './../workout-program-dialog/workout-program-dialog.component';
import { Component, inject, Input, OnInit } from '@angular/core';
import { WorkoutProgramComponent } from '../workout-program/workout-program.component';
import { WorkoutProgram } from '../../../models/workout-program';
import { WorkoutProgramService } from '../../../services/workout-program.service';
import { WorkoutService } from '../../../services/workout.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';



@Component({
  selector: 'app-workout-program-page',
  imports: [
    WorkoutProgramComponent,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './workout-program-page.component.html',
  styleUrl: './workout-program-page.component.css'
})
export class WorkoutProgramPageComponent implements OnInit {

  programs: WorkoutProgram[] = [];
  allPrograms: WorkoutProgram[] = [];
  programId: number | null = null;
  selectedWorkouts: any[] = [];
  router = inject(Router);

  constructor(
    private workoutProgramService: WorkoutProgramService,
    private workoutService: WorkoutService,
    private dialog: MatDialog,
    private authServcie: AuthService
    
  ) {}


  ngOnInit(): void {
    this.loadPrograms();
    this.loadAllPrograms();
  }

  loadPrograms() {
    console.log("id: ", this.authServcie.id);
    
    this.workoutProgramService.getProgramsByUser(this.authServcie.id).subscribe(programs => {
      this.programs = programs;
    });
  }
  loadAllPrograms(): void {
    this.workoutProgramService.getAllPrograms().subscribe(allPrograms => {
      this.allPrograms = allPrograms; // Все программы
    });
  }

  viewWorkouts(programId: number): void {
    this.workoutService.getWorkoutsByProgram(programId).subscribe(workouts => {
      this.selectedWorkouts = workouts;
      console.log('Тренировки для программы:', workouts);
    });
  }

  openAddProgramDialog(): void {
    const dialogRef = this.dialog.open(WorkoutProgramDialogComponent, {
      width: '1500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workoutProgramService.createProgram(result).subscribe(() => {
          this.loadPrograms();
        });
      }
    });
  }

  onProgramEdited(program: any): void {
    const dialogRef = this.dialog.open(WorkoutProgramDialogComponent, {
      width: '1500px',
      data: { isEdit: true, program }
    });

    dialogRef.afterClosed().subscribe(updatedProgram => {
      if (updatedProgram) {
      this.workoutProgramService.updateProgram(updatedProgram.id, updatedProgram).subscribe(() => this.loadPrograms());
      }
    });
  }

  onProgramDeleted(id: number): void {
    this.workoutProgramService.deleteProgram(id).subscribe(() => {
      this.loadPrograms();
    });
  }
}
