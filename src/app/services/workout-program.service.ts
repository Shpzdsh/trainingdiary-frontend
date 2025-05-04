import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutProgram, WorkoutProgramDto } from '../models/workout-program';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {
  private baseUrl = `${environment.apiUrl}/api/workout-programs`;

  constructor(
    private http: HttpClient
  ) { }

  getAllPrograms(): Observable<WorkoutProgram[]> {
    return this.http.get<WorkoutProgram[]>(`${this.baseUrl}`);
  }

  getProgramsByUser(userId: number): Observable<WorkoutProgram[]> {
    return this.http.get<WorkoutProgram[]>(`${this.baseUrl}/user/${userId}`)
  }

  createProgram(dto: WorkoutProgramDto): Observable<WorkoutProgram> {
    return this.http.post<WorkoutProgram>(this.baseUrl, dto);
  }

  updateProgram(id: number, dto: WorkoutProgramDto): Observable<WorkoutProgram> {
    return this.http.put<WorkoutProgram>(`${this.baseUrl}/${id}`, dto);
  }

  deleteProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
