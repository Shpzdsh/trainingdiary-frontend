import { Component } from '@angular/core';
import { WorkoutPageComponent } from './pages/workouts/workout-page/workout-page.component';
import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { canActivateAuth } from './auth/access.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { WorkoutProgramPageComponent } from './pages/workout-programs/workout-program-page/workout-program-page.component';
import { ExercisePageComponent } from './pages/exercises/exercise-page/exercise-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegPageComponent },
  {
    path:'', component:LayoutComponent, children: [
      { path: 'workoutprograms', component: WorkoutProgramPageComponent},
      {path: 'workoutprograms/new', component: WorkoutProgramPageComponent},
      {path: 'workoutprograms/:id', component: WorkoutProgramPageComponent},
      {path: 'workouts/:programId/program', component: WorkoutPageComponent },
      {path: 'exercise/workout/:workoutId', component: ExercisePageComponent},
      {path: '', redirectTo: 'workoutprograms', pathMatch: "full"}
    ], canActivate: [canActivateAuth]
  }
];
