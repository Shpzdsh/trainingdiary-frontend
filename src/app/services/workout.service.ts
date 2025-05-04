import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Workout, WorkoutDto } from '../models/workout';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private baseUrl = `${environment.apiUrl}/api/workouts`;

  constructor(
    private http: HttpClient
  ) { }

  getWorkoutsByProgram(programId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/${programId}/program`);
  }

  createWorkout(workoutDto: WorkoutDto): Observable<Workout> {
    return this.http.post<Workout>(`${this.baseUrl}`, workoutDto);
  }

  updateWorkout(id:number, workoutDto: WorkoutDto): Observable<Workout> {
    return this.http.post<Workout>(`${this.baseUrl}/${id}`, workoutDto);
  }

  deleteWorkout(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
