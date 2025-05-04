import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Exercise, ExerciseDto } from '../models/exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private baseUrl = `${environment.apiUrl}/api/exercise`;

  constructor(
    private http: HttpClient
  ) { }


  createExercise(exerciseDto: ExerciseDto): Observable<Exercise> {
    return this.http.post<Exercise>(this.baseUrl, exerciseDto);
  }

  getExercisesByWorkout(workoutId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/workout/${workoutId}`);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
