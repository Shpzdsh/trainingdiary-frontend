import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkoutProgram } from '../../../models/workout-program';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workout-program',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    RouterModule],
  templateUrl: './workout-program.component.html',
  styleUrl: './workout-program.component.css'
})
export class WorkoutProgramComponent {
  @Input() program: any;
  @Output() programEdited = new EventEmitter<any>();
  @Output() programDeleted = new EventEmitter<number>();

  onEdit(): void {
    this.programEdited.emit(this.program);
  }

  onDelete(): void {
    this.programDeleted.emit(this.program.id);
  }
}
